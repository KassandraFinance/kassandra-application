import Big from 'big.js'
import { Contract, JsonRpcProvider, JsonRpcSigner } from 'ethers'

import { BNtoDecimal } from '@/utils/numerals'

import HermesProxy from '../constants/abi/HermesProxy.json'

import {
  CalcAllOutGivenPoolInParams,
  CalcAmountOutParams,
  CalcSingleOutGivenPoolInParams,
  EstimatedGasParams,
  ExitSwapPoolAllTokenAmountInParams,
  ExitSwapPoolAmountInParams,
  IOperations,
  IPoolInfoProps,
  JoinSwapAmountInParams
} from './IOperation'
import { NATIVE_ADDRESS, networks } from '../constants/tokenAddresses'

import ERC20 from '../hooks/useERC20'
import { corePoolContract } from '../hooks/usePoolContract'
import { YieldYakContract } from '../hooks/useYieldYakEthers'

import {
  checkTokenInThePool,
  checkTokenWithHigherLiquidityPool,
  getTokenWrapped
} from '../utils/poolUtils'

import { GetAmountsParams, ISwapProvider } from './ISwapProvider'

export interface ItokenSelectedProps {
  tokenInAddress: string
  newAmountsTokenIn: string[]
  transactionsDataTx: string[]
  isWrap: number | undefined
}
export default class operationV1 implements IOperations {
  contract: Contract
  crpPool: string
  contractAddress: string
  withdrawContract: string
  referral = '0x0000000000000000000000000000000000000000'
  corePoolContract: ReturnType<typeof corePoolContract>
  ER20Contract: ReturnType<typeof ERC20>
  yieldYakContract: ReturnType<typeof YieldYakContract>
  poolInfo: IPoolInfoProps
  swapProvider: ISwapProvider
  signerProvider: JsonRpcSigner | undefined

  constructor(
    proxyAddress: string,
    _crpPool: string,
    _poolInfo: IPoolInfoProps,
    _corePoolContract: ReturnType<typeof corePoolContract>,
    _ER20Contract: ReturnType<typeof ERC20>,
    _yieldYakContract: ReturnType<typeof YieldYakContract>,
    _swapProvider: ISwapProvider,
    _signerProvider: JsonRpcSigner | undefined
  ) {
    this.swapProvider = _swapProvider
    this.contractAddress = proxyAddress
    this.contract = new Contract(
      this.contractAddress,
      HermesProxy,
      _signerProvider
    )
    this.crpPool = _crpPool
    this.contractAddress = proxyAddress
    this.corePoolContract = _corePoolContract
    this.ER20Contract = _ER20Contract
    this.yieldYakContract = _yieldYakContract
    this.withdrawContract = proxyAddress
    this.poolInfo = _poolInfo
    this.signerProvider = _signerProvider
  }

  async getDatasTx(slippage = '0.5', txs: Array<any>) {
    return this.swapProvider.getDatasTx(
      this.poolInfo.chainId,
      this.contractAddress,
      slippage,
      txs
    )
  }

  async getAmountsOut(params: GetAmountsParams) {
    return await this.swapProvider.getAmountsOut(params)
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
    selectedTokenInBalance,
    amountTokenIn,
    tokenInAddress
  }: CalcAmountOutParams) {
    const checkedTokenInPool = checkTokenInThePool(
      this.poolInfo.tokens,
      tokenInAddress
    )

    const avaxValue =
      tokenInAddress === NATIVE_ADDRESS ? amountTokenIn.toFixed(0) : '0'

    try {
      if (checkedTokenInPool) {
        const investAmountOut =
          await this.contract.joinswapExternAmountIn.staticCall(
            this.crpPool,
            tokenInAddress,
            BigInt(amountTokenIn.toFixed()),
            minAmountOut,
            this.referral,
            {
              from: userWalletAddress
            }
          )

        return {
          investAmountOut,
          transactionError: undefined
        }
      }
      const { address: tokenExchange } = checkTokenWithHigherLiquidityPool(
        this.poolInfo.tokens
      )
      const tokenWrappedAddress = getTokenWrapped(
        this.poolInfo.tokens,
        tokenExchange
      )

      const investAmountOut =
        await this.contract.joinswapExternAmountInWithSwap.staticCall(
          this.crpPool,
          tokenInAddress,
          amountTokenIn.toFixed(0),
          tokenWrappedAddress?.token.id,
          minAmountOut,
          this.referral,
          tokenSelected.transactionsDataTx[0],
          {
            from: userWalletAddress,
            value: avaxValue
          }
        )

      return {
        investAmountOut,
        transactionError: undefined
      }
    } catch (error: any) {
      const {
        denormalizedWeight,
        poolSupply,
        poolSwapFee,
        poolTotalDenormalizedWeight,
        totalPoolBalance
      } = await this.getInfoPool(tokenSelected.tokenInAddress)

      let investAmoutInCalc = Big(tokenSelected.newAmountsTokenIn[0])
      if (tokenSelected.isWrap) {
        investAmoutInCalc =
          await this.yieldYakContract.convertBalanceWrappedToYRT(
            investAmoutInCalc.toFixed(0),
            tokenSelected.tokenInAddress
          )
      }

      const investAmountOut =
        await this.corePoolContract.calcPoolOutGivenSingleIn(
          totalPoolBalance,
          denormalizedWeight,
          BigInt(poolSupply),
          poolTotalDenormalizedWeight,
          BigInt(investAmoutInCalc.toFixed(0)),
          poolSwapFee
        )

      const errorStr = error.toString()
      let transactionError: string | undefined = undefined

      if (errorStr.search(/ERR_(BPOW_BASE_TOO_|MATH_APPROX)/) > -1) {
        transactionError = 'This amount is too low for the pool!'
      }
      if (errorStr.search('ERR_MAX_IN_RATIO') > -1) {
        transactionError =
          "The amount can't be more than half of what's in the pool!"
      }
      if (
        Big(amountTokenIn).gt(selectedTokenInBalance) &&
        Number(tokenSelected.newAmountsTokenIn[0].toString()) > 0
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
    hasTokenInPool
  }: JoinSwapAmountInParams) {
    const avaxValue = tokenInAddress === NATIVE_ADDRESS ? tokenAmountIn : '0'

    if (hasTokenInPool) {
      const res = await this.contract.joinswapExternAmountIn(
        this.crpPool,
        tokenInAddress,
        tokenAmountIn,
        minPoolAmountOut,
        this.referral,
        { from: userWalletAddress, value: avaxValue }
      )

      return res
    }

    const { address: tokenExchange } = checkTokenWithHigherLiquidityPool(
      this.poolInfo.tokens
    )
    const tokenWrappedAddress = getTokenWrapped(
      this.poolInfo.tokens,
      tokenExchange
    )

    const res = await this.contract.joinswapExternAmountInWithSwap(
      this.crpPool,
      tokenInAddress,
      tokenAmountIn,
      tokenWrappedAddress?.token.id,
      minPoolAmountOut,
      this.referral,
      data,
      { from: userWalletAddress, value: avaxValue }
    )

    return res
  }

  async estimatedGas({
    userWalletAddress,
    tokenInAddress,
    minPoolAmountOut,
    amountTokenIn,
    data
  }: EstimatedGasParams) {
    const tokensChecked = checkTokenInThePool(
      this.poolInfo.tokens,
      tokenInAddress
    )
    const avaxValue = tokenInAddress === NATIVE_ADDRESS ? amountTokenIn : '0'
    const tokenWithHigherLiquidity = checkTokenWithHigherLiquidityPool(
      this.poolInfo.tokens
    )

    let estimateGas
    if (tokensChecked) {
      estimateGas = await this.contract.joinswapExternAmountIn.estimateGas(
        this.crpPool,
        tokenInAddress,
        amountTokenIn,
        minPoolAmountOut,
        this.referral,
        {
          value: avaxValue
        }
      )
    } else {
      estimateGas =
        await this.contract.joinswapExternAmountInWithSwap.estimateGas(
          this.crpPool,
          tokenInAddress,
          amountTokenIn,
          tokenWithHigherLiquidity.address,
          minPoolAmountOut,
          this.referral,
          data,
          {
            value: avaxValue
          }
        )
    }

    const jsonProvider = new JsonRpcProvider(networks[43114].rpc)
    const feeData = await jsonProvider.getFeeData()
    const fee = Big(feeData?.maxFeePerGas?.toString() ?? '0').mul(
      Big(estimateGas?.toString() ?? '0')
    )

    return {
      feeNumber: fee.toNumber(),
      feeString: BNtoDecimal(fee.div(Big(10).pow(18)), 3, 6)
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

      const withdrawAmoutOut =
        await this.contract.exitswapPoolAmountIn.staticCall(
          this.crpPool,
          tokenSelectAddress,
          poolAmountIn,
          '0',
          { from: userWalletAddress }
        )

      return {
        withdrawAmoutOut: Big(withdrawAmoutOut.toString()),
        transactionError: undefined
      }
      // }
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
        BigInt(poolSupply),
        poolTotalDenormalizedWeight,
        BigInt(poolAmountIn),
        poolSwapFee,
        exitFee
      )

      let withdrawAmoutOut = Big(value)
      if (isWrap) {
        withdrawAmoutOut = await this.yieldYakContract.convertBalanceYRTtoWrap(
          withdrawAmoutOut.toFixed(0),
          tokenInAddress
        )
      }

      let transactionError: string | undefined = undefined
      if (errorStr.search(/ERR_(BPOW_BASE_TOO_|MATH_APPROX)/) > -1) {
        transactionError = 'This amount is too low for the pool!'
      }

      if (errorStr.search('ERR_MAX_OUT_RATIO') > -1) {
        transactionError =
          "The amount you are trying to obtain can't be more than a third of what's in the pool!"
      }

      if (errorStr.search('below minimum') > -1) {
        transactionError = 'This amount is below minimum withdraw!'
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

  getWithdrawAmount(
    supplyPoolToken: Big,
    amountPoolToken: Big,
    balanceOut: Big,
    exitFee: Big
  ): Big {
    // if (supplyPoolToken.toString(10) === '0') {
    //   return Big(0)
    // }

    // 10^18
    const one = Big('1')
    const two = Big('2')
    const bigOne = Big('10').pow(18)
    // const bigOne = Big('10').pow(Big('18'))
    const halfBigOne = bigOne.div(two)
    // calculated fee (bmul)
    const fee = amountPoolToken.mul(exitFee).add(halfBigOne).div(bigOne)
    const pAiAfterExitFee = amountPoolToken.sub(fee)
    const supply = supplyPoolToken.add(one)
    // ratio of the token (bdiv)
    const ratio = pAiAfterExitFee.mul(bigOne).add(supply.div(two)).div(supply)
    // amount of tokens (bmul)
    const tokenAmountOut = ratio
      .mul(balanceOut.sub(one))
      .add(halfBigOne)
      .div(bigOne)

    return tokenAmountOut
  }

  // calcWithdrawAmountsOut
  async calcAllOutGivenPoolIn({
    poolAmountIn,
    userWalletAddress,
    selectedTokenInBalance
  }: CalcAllOutGivenPoolInParams) {
    const withdrawAllAmoutOut: Record<string, Big> = {}
    let transactionError: string | undefined = undefined
    const tokensInPool = this.poolInfo.tokens.map(
      item => item.token.wraps?.id ?? item.token.id
    )

    try {
      const poolSupply = await this.ER20Contract.totalSupply()
      const exitFee = await this.corePoolContract.exitFee()

      await Promise.all(
        this.poolInfo.tokens.map(async item => {
          const swapOutTotalPoolBalance = await this.corePoolContract.balance(
            item.token.id
          )

          let withdrawAmout = this.getWithdrawAmount(
            Big(poolSupply),
            poolAmountIn,
            Big(swapOutTotalPoolBalance.toString()),
            Big(exitFee.toString())
          )
          if (item.token.wraps) {
            withdrawAmout = await this.yieldYakContract.convertBalanceYRTtoWrap(
              withdrawAmout.toFixed(0),
              item.token.id
            )
          }

          Object.assign(withdrawAllAmoutOut, {
            [item.token.id]: withdrawAmout.div(
              Big(10).pow(item.token?.wraps?.decimals ?? item.token.decimals)
            )
          })
        })
      )

      await this.contract.exitPool.staticCall(
        this.crpPool,
        poolAmountIn.toFixed(),
        tokensInPool,
        Array(tokensInPool.length).fill('0'),
        { from: userWalletAddress }
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorStr = error.toString()

      if (errorStr.search(/ERR_(BPOW_BASE_TOO_|MATH_APPROX)/) > -1) {
        transactionError = 'This amount is too low for the pool!'
      }

      if (errorStr.search('ERR_MAX_OUT_RATIO') > -1) {
        transactionError =
          "The amount you are trying to obtain can't be more than a third of what's in the pool!"
      }

      if (errorStr.search('below minimum') > -1) {
        transactionError = 'This amount is below minimum withdraw!'
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
    userWalletAddress
  }: ExitSwapPoolAmountInParams) {
    const res = await this.contract.exitswapPoolAmountIn(
      this.crpPool,
      tokenOutAddress,
      tokenAmountIn,
      minPoolAmountOut,
      {
        from: userWalletAddress
      }
    )

    return res
  }

  async exitswapPoolAllTokenAmountIn({
    tokenAmountIn,
    amountAllTokenOut,
    slippageBase,
    slippageExp,
    userWalletAddress
  }: ExitSwapPoolAllTokenAmountInParams) {
    const swapOutAmounts = this.poolInfo.tokens.map(asset =>
      amountAllTokenOut[asset.token.id].mul(slippageBase).div(slippageExp)
    )

    const tokensWithdraw = this.poolInfo.tokens.map(token =>
      token.token.wraps ? token.token.wraps.id : token.token.id
    )

    const res = await this.contract.exitPool(
      this.crpPool,
      tokenAmountIn,
      tokensWithdraw,
      swapOutAmounts,
      { from: userWalletAddress }
    )
    return res
  }
}
