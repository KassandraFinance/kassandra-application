import Big from 'big.js'
import { Contract, JsonRpcProvider, JsonRpcSigner, ethers } from 'ethers'

import ProxyInvestV2 from '../constants/abi/ProxyInvestV2.json'
import BalancerHelpers from '../constants/abi/BalancerHelpers.json'
import KassandraController from '../constants/abi/KassandraController.json'
import VaultBalancer from '../constants/abi/VaultBalancer.json'
import { NATIVE_ADDRESS, networks } from '../constants/tokenAddresses'

import { BNtoDecimal } from '@/utils/numerals'
import { checkTokenWithHigherLiquidityPool } from '../utils/poolUtils'

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
import { GetAmountsParams, ISwapProvider } from './ISwapProvider'

export interface ItokenSelectedProps {
  tokenInAddress: string
  newAmountTokenIn: string | Big
  transactionDataTx: string
  isWrap: number | undefined
}

export default class operationV2 implements IOperations {
  contract: Contract
  balancerHelpersContract: Contract
  contractAddress: string
  withdrawContract: string
  poolInfo: IPoolInfoProps
  managedPoolController: Contract
  vaultBalancer: Contract
  referral = '0x0000000000000000000000000000000000000000'
  swapProvider: ISwapProvider
  signerProvider: JsonRpcSigner | undefined

  constructor(
    proxyAddress: string,
    balancerHelpers: string,
    _poolInfo: IPoolInfoProps,
    _swapProvider: ISwapProvider,
    _signerProvider: JsonRpcSigner | undefined
  ) {
    this.swapProvider = _swapProvider
    this.contract = new Contract(proxyAddress, ProxyInvestV2, _signerProvider)
    this.balancerHelpersContract = new Contract(
      balancerHelpers,
      BalancerHelpers,
      new JsonRpcProvider(networks[Number(_poolInfo.chainId)].rpc)
    )
    this.managedPoolController = new Contract(
      _poolInfo.controller,
      KassandraController,
      new JsonRpcProvider(networks[Number(_poolInfo.chainId)].rpc)
    )
    this.vaultBalancer = new Contract(
      _poolInfo.vault,
      VaultBalancer,
      _signerProvider
    )
    this.poolInfo = _poolInfo
    this.contractAddress = proxyAddress
    this.withdrawContract = _poolInfo.vault
  }

  async getDatasTx() {
    return this.swapProvider.getDatasTx(
      this.poolInfo.chainId,
      this.contractAddress
    )
  }

  async getAmountsOut(params: GetAmountsParams) {
    return await this.swapProvider.getAmountsOut(params)
  }

  createRequestJoinInPool(newAmountsTokenIn: string[], minAmountOut: string) {
    const joinKind = 1
    const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]

    const userData = new ethers.AbiCoder().encode(
      ['uint256', 'uint256[]', 'uint256'],
      [joinKind, newAmountsTokenIn, minAmountOut]
    )

    const maxAmountsIn = [0, ...newAmountsTokenIn]
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
    selectedTokenInBalance,
    amountTokenIn,
    tokenInAddress
  }: CalcAmountOutParams) {
    let investAmountOut
    let investAmountOutWithoutFees
    let transactionError

    const request = this.createRequestJoinInPool(
      tokenSelected.newAmountsTokenIn,
      minAmountOut.toString()
    )

    try {
      let response = await this.balancerHelpersContract.queryJoin.staticCall(
        this.poolInfo.id,
        this.contractAddress,
        this.contractAddress,
        request,
        { from: userWalletAddress }
      )

      const totalBptOut = Big(response.bptOut)

      const feesResponse = await this.managedPoolController.getJoinFees()
      const amountToManager = totalBptOut
        .mul(feesResponse.feesToManager)
        .div((1e18).toString())
      const amountToReferral = totalBptOut
        .mul(feesResponse.feesToReferral)
        .div((1e18).toString())

      investAmountOutWithoutFees = response.bptOut
      investAmountOut = totalBptOut.sub(amountToManager.add(amountToReferral))

      response = await this.contract.joinPool.staticCall(
        userWalletAddress,
        this.referral,
        this.poolInfo.controller,
        request,
        {
          from: userWalletAddress
        }
      )

      investAmountOut = response.amountToRecipient

      return {
        investAmountOut,
        investAmountOutWithoutFees,
        transactionError
      }
    } catch (error: any) {
      const errorStr = error.toString().match(/(BAL#\d{0,3})/)

      if (errorStr) {
        const errorCode = errorStr[0].replace('BAL#', '')

        if (Number(errorCode) < 100) {
          transactionError = 'This amount is too low for the pool!'
        }
      }

      if (Big(amountTokenIn).gt(selectedTokenInBalance)) {
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
    data
  }: JoinSwapAmountInParams) {
    const { address: tokenExchange } = checkTokenWithHigherLiquidityPool(
      this.poolInfo.tokens
    )
    const nativeValue = tokenInAddress === NATIVE_ADDRESS ? tokenAmountIn : '0'

    const tokenIn =
      tokenInAddress === NATIVE_ADDRESS
        ? '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
        : tokenInAddress

    const datas = await this.getDatasTx()

    const res = await this.contract.joinPoolExactTokenInWithSwap(
      {
        recipient: userWalletAddress,
        referrer: this.referral,
        controller: this.poolInfo.controller,
        tokenIn,
        tokenAmountIn: tokenAmountIn,
        tokenExchange,
        minTokenAmountOut: minPoolAmountOut
      },
      datas,
      {
        from: userWalletAddress,
        value: nativeValue
      }
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
    const { address: tokenExchange } = checkTokenWithHigherLiquidityPool(
      this.poolInfo.tokens
    )

    const tokenIn =
      tokenInAddress === NATIVE_ADDRESS
        ? '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
        : tokenInAddress

    const nativeValue = tokenInAddress === NATIVE_ADDRESS ? amountTokenIn : '0'

    const datas = await this.getDatasTx()
    const estimateGas =
      await this.contract.joinPoolExactTokenInWithSwap.estimateGas(
        {
          recipient: userWalletAddress,
          referrer: this.referral,
          controller: this.poolInfo.controller,
          tokenIn,
          tokenAmountIn: amountTokenIn,
          tokenExchange,
          minTokenAmountOut: minPoolAmountOut
        },
        datas,
        {
          from: userWalletAddress,
          value: nativeValue
        }
      )

    const jsonProvider = new JsonRpcProvider(networks[137].rpc)
    const feeData = await jsonProvider.getFeeData()
    const fee = Big(feeData?.maxFeePerGas?.toString() ?? '0').mul(
      Big(estimateGas.toString() ?? '0')
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
    let withdrawAmoutOut
    let transactionError

    const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
    let indexToken = -1
    const _length = assets.length
    for (let index = 0; index < _length; index++) {
      if (assets[index] === tokenSelectAddress) {
        indexToken = index
        break
      }
    }

    if (indexToken === -1) throw new Error('Token not found')

    const userData = new ethers.AbiCoder().encode(
      ['uint256', 'uint256', 'uint256'],
      [0, poolAmountIn, indexToken - 1]
    )

    const request = {
      assets,
      minAmountsOut: new Array(assets.length).fill(0),
      userData,
      toInternalBalance: false
    }

    try {
      let response = await this.balancerHelpersContract.queryExit.staticCall(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request,
        {
          from: userWalletAddress
        }
      )

      withdrawAmoutOut = response.amountsOut[indexToken]

      response = await this.vaultBalancer.exitPool.staticCall(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request,
        { from: userWalletAddress }
      )

      return {
        withdrawAmoutOut,
        transactionError
      }
    } catch (error: any) {
      let transactionError: string | undefined = undefined
      if (Big(poolAmountIn).gt(selectedTokenInBalance)) {
        transactionError = 'This amount exceeds your balance!'
      }

      return {
        withdrawAmoutOut,
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
    const withdrawAllAmoutOut: Record<string, Big> = {}
    const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
    const userData = new ethers.AbiCoder().encode(
      ['uint256', 'uint256'],
      [1, poolAmountIn.toString()]
    )

    const request = {
      assets,
      minAmountsOut: new Array(assets.length).fill(0),
      userData,
      toInternalBalance: false
    }

    let allAmountsOut
    let transactionError: string | undefined = undefined

    try {
      const response = await this.balancerHelpersContract.queryExit.staticCall(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request,
        { from: userWalletAddress }
      )

      allAmountsOut = response.amountsOut.slice(1, response.amountsOut.length)

      const _length = this.poolInfo.tokensAddresses.length
      for (let i = 0; i < _length; i++) {
        Object.assign(withdrawAllAmoutOut, {
          [this.poolInfo.tokensAddresses[i]]: Big(
            allAmountsOut[i].toString()
          ).div(Big(10).pow(18))
        })
      }

      await this.vaultBalancer.exitPool.staticCall(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request,
        { from: userWalletAddress }
      )

      return {
        withdrawAllAmoutOut,
        transactionError: undefined
      }
    } catch (error: any) {
      const errorStr = error.toString().match(/(BAL#\d{0,3})/)

      if (errorStr) {
        const errorCode = errorStr[0].replace('BAL#', '')

        if (Number(errorCode) < 100) {
          transactionError = 'This amount is below minimum withdraw!'
        }
      }

      if (Big(poolAmountIn).gt(selectedTokenInBalance)) {
        transactionError = 'This amount exceeds your balance!'
      }

      return {
        withdrawAllAmoutOut,
        transactionError
      }
    }
  }

  async exitswapPoolAmountIn({
    tokenOutAddress,
    tokenAmountIn,
    minPoolAmountOut,
    userWalletAddress
  }: ExitSwapPoolAmountInParams) {
    const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
    let indexToken = -1
    const _length = assets.length
    for (let index = 0; index < _length; index++) {
      if (assets[index].toLowerCase() === tokenOutAddress.toLowerCase()) {
        indexToken = index
        break
      }
    }

    if (indexToken === -1) throw new Error('Token not found')

    const userData = new ethers.AbiCoder().encode(
      ['uint256', 'uint256', 'uint256'],
      [0, tokenAmountIn.toString(), indexToken - 1]
    )

    const minAmountsOut = new Array(_length).fill(0)

    minAmountsOut[indexToken] = minPoolAmountOut.toString()

    const request = {
      assets,
      minAmountsOut,
      userData,
      toInternalBalance: false
    }

    const res = await this.vaultBalancer.exitPool(
      this.poolInfo.id,
      userWalletAddress,
      userWalletAddress,
      request,
      { from: userWalletAddress }
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
    const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]

    const userData = new ethers.AbiCoder().encode(
      ['uint256', 'uint256'],
      [1, tokenAmountIn.toString()]
    )

    const minAmountsOutTokens = this.poolInfo.tokensAddresses.map(item =>
      amountAllTokenOut[item].mul(slippageBase).div(slippageExp).toFixed(0)
    )

    const request = {
      assets,
      minAmountsOut: [0, ...minAmountsOutTokens],
      userData,
      toInternalBalance: false
    }

    const res = await this.vaultBalancer.exitPool(
      this.poolInfo.id,
      userWalletAddress,
      userWalletAddress,
      request,
      { from: userWalletAddress }
    )

    return res
  }
}
