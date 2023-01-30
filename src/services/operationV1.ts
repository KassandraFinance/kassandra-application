import Big from 'big.js';
import BigNumber from 'bn.js'
import { AbiItem } from "web3-utils"
import { Contract } from 'web3-eth-contract';

import HermesProxy from "../constants/abi/HermesProxy.json"

import { CalcAllOutGivenPoolInParams, CalcAmountOutParams, CalcSingleOutGivenPoolInParams, EstimatedGasParams, ExitSwapPoolAllTokenAmountInParams, ExitSwapPoolAmountInParams, IOperations, IPoolInfoProps, JoinSwapAmountInParams } from './IOperation';
import { addressNativeToken1Inch } from '../constants/tokenAddresses';

import { ERC20 } from '../hooks/useERC20Contract';
import { corePoolContract } from '../hooks/usePoolContract';
import { YieldYakContract } from '../hooks/useYieldYak';

import { checkTokenInThePool, checkTokenWithHigherLiquidityPool, getTokenWrapped } from '../utils/poolUtils';

import web3 from '../utils/web3'

export interface ItokenSelectedProps {
  tokenInAddress: string;
  newAmountTokenIn: string | Big;
  transactionDataTx: string;
  isWrap: number | undefined;
}
export default class operationV1 implements IOperations {
  contract: Contract;
  crpPool: string;
  contractAddress: string;
  withdrawContract: string;
  referral = "0x0000000000000000000000000000000000000000";
  corePoolContract: ReturnType<typeof corePoolContract>;
  ER20Contract: ReturnType<typeof ERC20>
  yieldYakContract: ReturnType<typeof YieldYakContract>
  poolInfo: IPoolInfoProps;

  constructor(
    proxyAddress: string,
    _crpPool: string,
    _poolInfo: IPoolInfoProps,
    _corePoolContract: ReturnType<typeof corePoolContract>,
    _ER20Contract: ReturnType<typeof ERC20>,
    _yieldYakContract: ReturnType<typeof YieldYakContract>
  ) {
    // eslint-disable-next-line prettier/prettier
    this.contract = new web3.eth.Contract((HermesProxy as unknown) as AbiItem, proxyAddress)
    this.crpPool = _crpPool
    this.contractAddress = proxyAddress
    this.corePoolContract = _corePoolContract
    this.ER20Contract = _ER20Contract
    this.yieldYakContract = _yieldYakContract
    this.withdrawContract = proxyAddress
    this.poolInfo = _poolInfo
  }

  async getInfoPool(tokenInAddress: string) {
    const poolInfo = await Promise.all([
      this.corePoolContract.balance(tokenInAddress),
      this.corePoolContract.denormalizedWeight(tokenInAddress),
      this.corePoolContract.totalDenormalizedWeight(),
      this.corePoolContract.swapFee(),
      this.ER20Contract.totalSupply()
    ])

    return {
      totalPoolBalance: poolInfo[0],
      denormalizedWeight: poolInfo[1],
      poolTotalDenormalizedWeight: poolInfo[2],
      poolSwapFee: poolInfo[3],
      poolSupply: poolInfo[4]
    }
  }

  async calcInvestAmountOut({
    tokenSelected,
    userWalletAddress,
    minAmountOut,
    selectedTokenInBalance
  }: CalcAmountOutParams) {
    const {
      denormalizedWeight,
      poolSupply,
      poolSwapFee,
      poolTotalDenormalizedWeight,
      totalPoolBalance
    } = await this.getInfoPool(tokenSelected.tokenInAddress)

    try {
        const investAmountOut: BigNumber = await this.contract.methods
        .joinswapExternAmountIn(
          this.crpPool,
          tokenSelected.newAmountTokenIn,
          tokenSelected.tokenInAddress,
          minAmountOut,
          this.referral
        )
        .call({ from: userWalletAddress, value: new BigNumber(0) })

      return {
        investAmountOut,
        transactionError: undefined
      }

    } catch (error: any) {
        let investAmoutInCalc: BigNumber = new BigNumber(
        tokenSelected.newAmountTokenIn.toString()
      )

      if (tokenSelected.isWrap) {
        investAmoutInCalc = await this.yieldYakContract.convertBalanceWrappedToYRT(
          new BigNumber(tokenSelected.newAmountTokenIn.toString()),
          tokenSelected.tokenInAddress
        )
      }

      const investAmountOut = await this.corePoolContract.calcPoolOutGivenSingleIn(
        totalPoolBalance,
        denormalizedWeight,
        poolSupply,
        poolTotalDenormalizedWeight,
        investAmoutInCalc,
        poolSwapFee
      )

      const errorStr = error.toString()
      let transactionError: string | undefined = undefined

      if (errorStr.search(/ERR_(BPOW_BASE_TOO_|MATH_APPROX)/) > -1) {
        transactionError = 'This amount is too low for the pool!'
      }
      if (errorStr.search('ERR_MAX_IN_RATIO') > -1) {
        transactionError = "The amount can't be more than half of what's in the pool!"
      }
      if (
        Big(tokenSelected.newAmountTokenIn).gt(selectedTokenInBalance) &&
        Number(tokenSelected.newAmountTokenIn.toString()) > 0
      ) {
        transactionError = 'This amount exceeds your balance!'
      }
      return {
        investAmountOut,
        transactionError
      }
    }
  }

  async joinswapExternAmountIn({
    tokenInAddress,
    tokenAmountIn,
    minPoolAmountOut,
    userWalletAddress,
    data,
    hasTokenInPool,
    transactionCallback
  }: JoinSwapAmountInParams) {
    const avaxValue = tokenInAddress === addressNativeToken1Inch ? tokenAmountIn : new BigNumber(0)

    if (hasTokenInPool) {
      const res = await this.contract.methods
        .joinswapExternAmountIn(
          this.crpPool,
          tokenInAddress,
          tokenAmountIn,
          minPoolAmountOut,
          this.referral
        )
        .send({ from: userWalletAddress, value: avaxValue }, transactionCallback)

      return res
    }

    const { address: tokenExchange } = checkTokenWithHigherLiquidityPool(poolTokenList)

    const res = await this.contract.methods
      .joinswapExternAmountInWithSwap(
        this.crpPool,
        tokenInAddress,
        tokenAmountIn,
        tokenExchange,
        minPoolAmountOut,
        this.referral,
        data
      )
      .send({ from: userWalletAddress, value: avaxValue }, transactionCallback)

    return res
  }

  async estimatedGas({
    userWalletAddress,
    tokenInAddress,
    minPoolAmountOut,
    amountTokenIn,
    data,
  }: EstimatedGasParams) {
    const tokensChecked = checkTokenInThePool(this.poolInfo.tokens, tokenInAddress)
    const avaxValue = tokenInAddress === addressNativeToken1Inch ? amountTokenIn : new BigNumber(0)
    const tokenWithHigherLiquidity = checkTokenWithHigherLiquidityPool(this.poolInfo.tokens)

    const estimateGas = await web3.eth.estimateGas({
      // "value": '0x0', // Only tokens
      "data": tokensChecked ?
        this.contract.methods.joinswapExternAmountIn(this.crpPool, tokenInAddress, amountTokenIn, minPoolAmountOut, this.referral).encodeABI() :
        this.contract.methods.joinswapExternAmountInWithSwap(this.crpPool, tokenInAddress, amountTokenIn, tokenWithHigherLiquidity.address, minPoolAmountOut, this.referral, data).encodeABI(),
      "from": userWalletAddress,
      "to": tokenWithHigherLiquidity.address,
      "value": avaxValue
    });
    const gasPrice = await web3.eth.getGasPrice()

    const fee = (Number(gasPrice) * estimateGas)  * 1.3
    const finalGasInEther = web3.utils.fromWei(fee.toString(), 'ether');

    return {
      feeNumber: fee,
      feeString: finalGasInEther
    }
  }

  async calcSingleOutGivenPoolIn({
    tokenInAddress,
    tokenSelectAddress,
    poolAmountIn,
    isWrap,
    userWalletAddress,
    selectedTokenInBalance
  }: CalcSingleOutGivenPoolInParams) {
    try {
      // if (userWalletAddress.length > 0 && Big(poolAmountIn).gt(Big('0'))) {
      const withdrawAmoutOut: BigNumber = await this.contract.methods.exitswapPoolAmountIn(
        this.crpPool,
        tokenSelectAddress,
        new BigNumber(poolAmountIn.toString()),
        new BigNumber('0'),
      ).call({ from: userWalletAddress })

      return {
        withdrawAmoutOut,
        transactionError: undefined
      }
      // }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const {
        denormalizedWeight,
        poolSupply,
        poolSwapFee,
        poolTotalDenormalizedWeight,
        totalPoolBalance
      } = await this.getInfoPool(tokenInAddress)
      const exitFee = await this.corePoolContract.exitFee()
      const errorStr = error.toString()

      const value = await this.corePoolContract.calcSingleOutGivenPoolIn(
        totalPoolBalance,
        denormalizedWeight,
        poolSupply,
        poolTotalDenormalizedWeight,
        new BigNumber(poolAmountIn.toString()),
        poolSwapFee,
        exitFee
      )

      let withdrawAmoutOut: BigNumber = value
      if (isWrap) {
        withdrawAmoutOut = await this.yieldYakContract.convertBalanceYRTtoWrap(withdrawAmoutOut, tokenInAddress)
      }

      let transactionError: string | undefined = undefined
      if (errorStr.search(/ERR_(BPOW_BASE_TOO_|MATH_APPROX)/) > -1) {
        transactionError = 'This amount is too low for the pool!'
      }

      if (errorStr.search('ERR_MAX_OUT_RATIO') > -1) {
        transactionError =  "The amount you are trying to obtain can't be more than a third of what's in the pool!"
      }

      if (errorStr.search('below minimum') > -1) {
        transactionError = "This amount is below minimum withdraw!"
      }

      if (Big(poolAmountIn).gt(selectedTokenInBalance)) {
        transactionError = 'This amount exceeds your balance!'
      }

      return {
        withdrawAmoutOut,
        transactionError
      }
    }
  }

  getWithdrawAmount (
    supplyPoolToken: BigNumber,
    amountPoolToken: BigNumber,
    balanceOut: BigNumber,
    exitFee: BigNumber
  ): BigNumber {
    if (supplyPoolToken.toString(10) === '0') {
      return new BigNumber(0)
    }

    // 10^18
    const one = new BigNumber('1')
    const two = new BigNumber('2')
    const bigOne = new BigNumber('10').pow(new BigNumber('18'))
    const halfBigOne = bigOne.div(two)
    // calculated fee (bmul)
    const fee = amountPoolToken
      .mul(exitFee)
      .add(halfBigOne)
      .div(bigOne);
    const pAiAfterExitFee = amountPoolToken.sub(fee);
    const supply = supplyPoolToken.add(one)
    // ratio of the token (bdiv)
    const ratio = pAiAfterExitFee
      .mul(bigOne)
      .add(supply.div(two))
      .div(supply);
    // amount of tokens (bmul)
    const tokenAmountOut = ratio
      .mul(balanceOut.sub(one))
      .add(halfBigOne)
      .div(bigOne);

    return tokenAmountOut
  }

  // calcWithdrawAmountsOut
  async calcAllOutGivenPoolIn({
    poolAmountIn,
    userWalletAddress,
    selectedTokenInBalance
  }: CalcAllOutGivenPoolInParams) {
    let withdrawAllAmoutOut = [new BigNumber('0')]
    let transactionError: string | undefined = undefined
    const tokensInPool = this.poolInfo.tokens.map(item => item.token.wraps?.id ?? item.token.id)

    try {
      const poolSupply = await this.ER20Contract.totalSupply()
      const exitFee = await this.corePoolContract.exitFee()

      withdrawAllAmoutOut = await Promise.all(
        this.poolInfo.tokens.map(async (item) => {
          const swapOutTotalPoolBalance = await this.corePoolContract.balance(item.token.id)

          const withdrawAmout = this.getWithdrawAmount(
            poolSupply,
            new BigNumber(poolAmountIn.toString()),
            swapOutTotalPoolBalance,
            exitFee
          )
          if (item.token.wraps) {
            return await this.yieldYakContract.convertBalanceYRTtoWrap(withdrawAmout, item.token.id)
          }
          return withdrawAmout
        })
      )

      await this.contract.methods.exitPool(
        this.crpPool,
        new BigNumber(poolAmountIn.toString()),
        tokensInPool,
        Array(tokensInPool.length).fill(new BigNumber('0')),
      ).call({ from: userWalletAddress })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorStr = error.toString()

      if (errorStr.search(/ERR_(BPOW_BASE_TOO_|MATH_APPROX)/) > -1) {
        transactionError = 'This amount is too low for the pool!'
      }

      if (errorStr.search('ERR_MAX_OUT_RATIO') > -1) {
        transactionError =  "The amount you are trying to obtain can't be more than a third of what's in the pool!"
      }

      if (errorStr.search('below minimum') > -1) {
        transactionError = "This amount is below minimum withdraw!"
      }

      if (Big(poolAmountIn).gt(selectedTokenInBalance)) {
        transactionError = 'This amount exceeds your balance!'
      }
    }
    return {
      withdrawAllAmoutOut,
      transactionError
    }
  }

  async exitswapPoolAmountIn({
    tokenOutAddress,
    tokenAmountIn,
    minPoolAmountOut,
    userWalletAddress,
    transactionCallback
  }: ExitSwapPoolAmountInParams) {
    const res = await this.contract.methods
      .exitswapPoolAmountIn(this.crpPool, tokenOutAddress, tokenAmountIn, minPoolAmountOut)
      .send({ from: userWalletAddress }, transactionCallback)

    return res
  }

  async exitswapPoolAllTokenAmountIn({
    tokenAmountIn,
    amountAllTokenOut,
    slippageBase,
    slippageExp,
    userWalletAddress,
    transactionCallback
  }: ExitSwapPoolAllTokenAmountInParams) {
    this.corePoolContract.currentTokens()
      .then(async tokens => {
      const swapOutAmounts = []

      for (let i = 0; i < tokens.length; i++) {
        swapOutAmounts.push(
          amountAllTokenOut[i]
            .mul(slippageBase)
            .div(slippageExp)
        )
      }

      const tokensWithdraw = this.poolInfo.tokens.map(token =>
        token.token.wraps ?
        token.token.wraps.id :
        token.token.id
      )

      const res = await this.contract.methods
        .exitPool(this.crpPool, tokenAmountIn, tokensWithdraw, swapOutAmounts)
        .send({ from: userWalletAddress }, transactionCallback)
        return res
      })
  }
}
