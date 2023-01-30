import Big from 'big.js';
import BigNumber from 'bn.js'
import web3 from '../utils/web3'
import { AbiItem } from "web3-utils"
import { Contract } from 'web3-eth-contract';

import ProxyInvestV2 from "../constants/abi/ProxyInvestV2.json"
import BalancerHelpers from "../constants/abi/BalancerHelpers.json"
import ManagedPoolController from "../constants/abi/ManagedPoolController.json"
import VaultBalancer from "../constants/abi/VaultBalancer.json"

import { CalcAllOutGivenPoolInParams, CalcAmountOutParams, CalcSingleOutGivenPoolInParams, EstimatedGasParams, ExitSwapPoolAllTokenAmountInParams, ExitSwapPoolAmountInParams, IPoolInfoProps, JoinSwapAmountInParams } from './IOperation';
import { checkTokenInThePool, checkTokenWithHigherLiquidityPool } from '../utils/poolUtils';
import { addressNativeToken1Inch } from '../constants/tokenAddresses';

export interface ItokenSelectedProps {
  tokenInAddress: string;
  newAmountTokenIn: string | Big;
  transactionDataTx: string;
  isWrap: number | undefined;
}

export default class operationV2 {
  contract: Contract;
  balancerHelpersContract: Contract;
  contractAddress: string;
  withdrawContract: string;
  poolInfo: IPoolInfoProps;
  managedPoolController: Contract;
  vaultBalancer: Contract;
  referral = "0x0000000000000000000000000000000000000000";

  constructor(proxyAddress: string, balancerHelpers: string, _poolInfo: IPoolInfoProps) {
    // eslint-disable-next-line prettier/prettier
    this.contract = new web3.eth.Contract((ProxyInvestV2 as unknown) as AbiItem, proxyAddress)
    this.balancerHelpersContract = new web3.eth.Contract((BalancerHelpers as unknown) as AbiItem, balancerHelpers)
    this.managedPoolController = new web3.eth.Contract((ManagedPoolController as unknown) as AbiItem, _poolInfo.controller)
    this.vaultBalancer = new web3.eth.Contract((VaultBalancer as unknown) as AbiItem, _poolInfo.vault)
    this.poolInfo = _poolInfo
    this.contractAddress = proxyAddress
    this.withdrawContract = _poolInfo.vault
  }

  createRequestJoinInPool(tokenInAddress: string, newAmountTokenIn: string, minAmountOut: BigNumber) {
    const joinKind = 1
    // const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
    const assets = this.poolInfo.tokensAddresses
    const amountsIn = this.poolInfo.tokensAddresses.map(item => {
      if (item.toLowerCase() === tokenInAddress.toLowerCase()) {
        return newAmountTokenIn
      }
      return '0'
    })
    // const maxAmountsIn = [0, ...amountsIn]
    const maxAmountsIn = amountsIn
    const userData = web3.eth.abi.encodeParameters(['uint256', 'uint256[]', 'uint256'], [joinKind, maxAmountsIn, minAmountOut])

    const request = {
      assets,
      maxAmountsIn,
      userData,
      fromInternalBalance: false
    }

    return request
  }

  async calcInvestAmountOut({
    tokenSelected,
    userWalletAddress,
    minAmountOut,
    selectedTokenInBalance
  }: CalcAmountOutParams) {
    let investAmountOut
    let transactionError
    const request = this.createRequestJoinInPool(tokenSelected.tokenInAddress, tokenSelected.newAmountTokenIn.toString(), minAmountOut)

    try {
      const response = await this.balancerHelpersContract.methods.queryJoin(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request
      ).call({ from: userWalletAddress });

      investAmountOut = response.bptOut

      await this.contract.methods.joinPool(
        // userWalletAddress,
        // this.referral,
        // this.poolInfo.controller,
        this.poolInfo.id,
        request
      ).call({ from: userWalletAddress })

      return {
      investAmountOut,
      transactionError
    }
    } catch (error: any) {
      const errorStr = error.toString()

      let transactionError: string | undefined = undefined
      if (Big(tokenSelected.newAmountTokenIn).gt(selectedTokenInBalance)) {
        transactionError = 'This amount exceeds your balance!'
      }
      // const feesResponse = await this.managedPoolController.methods.getJoinFees().call()

      // const amountOut = response.bptOut
      // const amountToManager = amountOut.mul(feesResponse.feesToManager).div(1e18.toString());
      // const amountToReferral = amountOut.mul(feesResponse.feesToReferral).div(1e18.toString());
      // const amountToInvestor = amountOut.sub(amountToManager.add(amountToReferral))

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
    transactionCallback
  }: JoinSwapAmountInParams) {
    const hasTokenInPool = checkTokenInThePool(this.poolInfo.tokens, tokenInAddress)

    if (hasTokenInPool) {
      const request = this.createRequestJoinInPool(tokenInAddress, tokenAmountIn.toString(), minPoolAmountOut)

      const result = await this.contract.methods.joinPool(
        this.poolInfo.id,
        request
        // userWalletAddress,
        // this.referral,
        // this.poolInfo.controller,
      ).send({ from: userWalletAddress }, transactionCallback)

      return result
    }

    const { address: tokenExchange } = checkTokenWithHigherLiquidityPool(this.poolInfo.tokens)
    const nativeValue = tokenInAddress === addressNativeToken1Inch ? tokenAmountIn : new BigNumber(0)

    const res = await this.contract.methods.joinPoolExactTokenInWithSwap(
      // {
      // recipient: userWalletAddress,
      // referrer: this.referral,
      // controller: this.poolInfo.controller,
      // tokenIn: tokenInAddress,
      // tokenAmountIn: tokenAmountIn,
      // tokenExchange,
      // minTokenAmountOut: minPoolAmountOut,
      // },
      this.poolInfo.id,
      tokenInAddress,
      tokenAmountIn,
      tokenExchange,
      minPoolAmountOut,
      data
    ).send({ from: userWalletAddress , value: nativeValue})

    return res
  }

  async estimatedGas({
    userWalletAddress,
    tokenInAddress,
    minPoolAmountOut,
    amountTokenIn,
    data,
    poolTokenList
  }: EstimatedGasParams) {
    const feeNumber = 0
    const feeString = ''

    return {
      feeNumber,
      feeString
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
    // const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
    const assets = this.poolInfo.tokensAddresses
    let indexToken = -1
    for (let index = 0; index < this.poolInfo.tokensAddresses.length; index++) {
      if (this.poolInfo.tokensAddresses[index] === tokenSelectAddress) {
        indexToken = index
        break
      }
    }

    if (indexToken === -1) throw new Error('Token not found')

    const userData = web3.eth.abi.encodeParameters(['uint256', 'uint256', 'uint256'], [0, poolAmountIn, indexToken])
    const request = {
      assets,
      minAmountsOut: new Array(assets.length).fill(0),
      userData,
      toInternalBalance: false
    }

    try {
      // const response = await this.balancerHelpersContract.methods.exitPool(
      //   this.poolInfo.id,
      //   userWalletAddress,
      //   userWalletAddress,
      //   request
      // ).call({ from: userWalletAddress });
      const response = await this.vaultBalancer.methods.exitPool(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request
      ).call();

      return {
        withdrawAmoutOut: response.amountsOut[indexToken],
        transactionError: undefined
      }
    } catch (error: any) {
      console.log(error)
      const errorStr = error.toString()

      const response = await this.balancerHelpersContract.methods.queryExit(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request
      ).call({ from: userWalletAddress });
      console.log(response.amountsOut[indexToken])

      let transactionError: string | undefined = undefined
      if (Big(poolAmountIn).gt(selectedTokenInBalance)) {
        transactionError = 'This amount exceeds your balance!'
      }
      return {
        withdrawAmoutOut: response.amountsOut[indexToken] ?? 0,
        transactionError
      }
    }
  }

  // calcWithdrawAmountsOut
  async calcAllOutGivenPoolIn({
    poolAmountIn,
    userWalletAddress,
    selectedTokenInBalance
  }: CalcAllOutGivenPoolInParams) {
    // const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
    const assets = this.poolInfo.tokensAddresses
    const userData = web3.eth.abi.encodeParameters(['uint256', 'uint256'], [1, poolAmountIn.toString()])
    const request = {
      assets,
      minAmountsOut: new Array(assets.length).fill(0),
      userData,
      toInternalBalance: false
    }

    let allAmountsOut
    try {
      // const response = await this.balancerHelpersContract.methods.exitPool(
      //   this.poolInfo.id, userWalletAddress, userWalletAddress, request
      // ).call();

      const response = await this.balancerHelpersContract.methods.queryExit(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request
      ).call({ from: userWalletAddress });

      // request.minAmountsOut = response.amountsOut
      allAmountsOut = response.amountsOut

      // await this.vaultBalancer.methods.exitPool(
      //   this.poolInfo.id,
      //   userWalletAddress,
      //   userWalletAddress,
      //   request
      // ).call({ from: userWalletAddress });

      return {
        // withdrawAmoutOut: response.amountsOut,
        withdrawAllAmoutOut: allAmountsOut.map((item: string) => new BigNumber(item)),
        transactionError: undefined
      }
    } catch (error) {
      // const response = await this.balancerHelpersContract.methods.queryExit(
      //   this.poolInfo.id,
      //   userWalletAddress,
      //   userWalletAddress,
      //   request
      // ).call({ from: userWalletAddress });

      let transactionError: string | undefined = undefined
      if (Big(poolAmountIn).gt(selectedTokenInBalance)) {
        transactionError = 'This amount exceeds your balance!'
      }

      return {
        // withdrawAllAmoutOut: response.amountsOut?.map((item: string) => new BigNumber(item)),
        withdrawAllAmoutOut: allAmountsOut,
        transactionError
      }
    }
  }

  async exitswapPoolAmountIn({
    tokenOutAddress,
    tokenAmountIn,
    minPoolAmountOut,
    userWalletAddress,
    transactionCallback
  }: ExitSwapPoolAmountInParams) {
    try {
      // const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
      const assets = this.poolInfo.tokensAddresses
      let indexToken = -1
      for (let index = 0; index < this.poolInfo.tokensAddresses.length; index++) {
        if (this.poolInfo.tokensAddresses[index].toLowerCase() === tokenOutAddress.toLowerCase()) {
          indexToken = index
          break
        }
      }

      if (indexToken === -1) throw new Error('Token not found')
      const userData = web3.eth.abi.encodeParameters(['uint256', 'uint256', 'uint256'], [0, tokenAmountIn.toString(), indexToken])
      const minAmountsOut = this.poolInfo.tokensAddresses.map(item => {
        if(item.toLowerCase() === tokenOutAddress.toLowerCase()) {
          return minPoolAmountOut.toString()
        }
        return '0'
      })

      const request = {
        assets,
        minAmountsOut,
        userData,
        toInternalBalance: false
      }

      await this.vaultBalancer.methods.exitPool(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request
      ).send({ from: userWalletAddress }, transactionCallback);

    } catch (error) {
      console.log(error)
    }
  }

  async exitswapPoolAllTokenAmountIn({
    tokenAmountIn,
    amountAllTokenOut,
    slippageBase,
    slippageExp,
    userWalletAddress,
    transactionCallback
  }: ExitSwapPoolAllTokenAmountInParams) {
    try {
      // const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
      const assets = this.poolInfo.tokensAddresses
      const userData = web3.eth.abi.encodeParameters(['uint256', 'uint256'], [1, tokenAmountIn.toString()])
      const minAmountsOut = amountAllTokenOut.map(item => {
        return item.mul(slippageBase).div(slippageExp).toString()
      })
      const request = {
        assets,
        minAmountsOut,
        userData,
        toInternalBalance: false
      }

      await this.vaultBalancer.methods.exitPool(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request
      ).send({ from: userWalletAddress}, transactionCallback);

      // return {
      //   withdrawAmoutOut: response.amountsOut,
      //   transactionError: undefined
      // }
    } catch (error) {
      console.log(error)
    }
  }
}


