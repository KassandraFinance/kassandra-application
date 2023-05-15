import Big from 'big.js'
import BigNumber from 'bn.js'
import web3 from '../utils/web3'
import { AbiItem } from 'web3-utils'
import { Contract } from 'web3-eth-contract'

import ProxyInvestV2 from '../constants/abi/ProxyInvestV2.json'
import BalancerHelpers from '../constants/abi/BalancerHelpers.json'
import KassandraController from '../constants/abi/KassandraController.json'
import VaultBalancer from '../constants/abi/VaultBalancer.json'

import {
  CalcAllOutGivenPoolInParams,
  CalcAmountOutParams,
  CalcSingleOutGivenPoolInParams,
  EstimatedGasParams,
  ExitSwapPoolAllTokenAmountInParams,
  ExitSwapPoolAmountInParams,
  IPoolInfoProps,
  JoinSwapAmountInParams
} from './IOperation'
import {
  checkTokenInThePool,
  checkTokenWithHigherLiquidityPool
} from '../utils/poolUtils'
import { addressNativeToken1Inch } from '../constants/tokenAddresses'

export interface ItokenSelectedProps {
  tokenInAddress: string
  newAmountTokenIn: string | Big
  transactionDataTx: string
  isWrap: number | undefined
}

export default class operationV2 {
  contract: Contract
  balancerHelpersContract: Contract
  contractAddress: string
  withdrawContract: string
  poolInfo: IPoolInfoProps
  managedPoolController: Contract
  vaultBalancer: Contract
  referral = '0x0000000000000000000000000000000000000000'

  constructor(
    proxyAddress: string,
    balancerHelpers: string,
    _poolInfo: IPoolInfoProps
  ) {
    // eslint-disable-next-line prettier/prettier
    this.contract = new web3.eth.Contract(
      ProxyInvestV2 as unknown as AbiItem,
      proxyAddress
    )
    this.balancerHelpersContract = new web3.eth.Contract(
      BalancerHelpers as unknown as AbiItem,
      balancerHelpers
    )
    this.managedPoolController = new web3.eth.Contract(
      KassandraController as unknown as AbiItem,
      _poolInfo.controller
    )
    this.vaultBalancer = new web3.eth.Contract(
      VaultBalancer as unknown as AbiItem,
      _poolInfo.vault
    )
    this.poolInfo = _poolInfo
    this.contractAddress = proxyAddress
    this.withdrawContract = _poolInfo.vault
  }

  createRequestJoinInPool(
    tokenInAddress: string,
    newAmountTokenIn: string,
    minAmountOut: BigNumber
  ) {
    const joinKind = 1
    const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
    const amountsIn = this.poolInfo.tokensAddresses.map(item => {
      if (item.toLowerCase() === tokenInAddress.toLowerCase()) {
        return newAmountTokenIn
      }
      return '0'
    })
    const userData = web3.eth.abi.encodeParameters(
      ['uint256', 'uint256[]', 'uint256'],
      [joinKind, amountsIn, minAmountOut]
    )
    const maxAmountsIn = [0, ...amountsIn]
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
    let transactionError
    const request = this.createRequestJoinInPool(
      tokenSelected.tokenInAddress,
      tokenSelected.newAmountTokenIn.toString(),
      minAmountOut
    )
    try {
      let response = await this.balancerHelpersContract.methods
        .queryJoin(
          this.poolInfo.id,
          this.contractAddress,
          this.contractAddress,
          request
        )
        .call({ from: userWalletAddress })

      const totalBptOut = Big(response.bptOut)
      const feesResponse = await this.managedPoolController.methods
        .getJoinFees()
        .call()
      const amountToManager = totalBptOut
        .mul(feesResponse.feesToManager)
        .div((1e18).toString())
      const amountToReferral = totalBptOut
        .mul(feesResponse.feesToReferral)
        .div((1e18).toString())

      investAmountOut = totalBptOut.sub(amountToManager.add(amountToReferral))

      response = await this.contract.methods
        .joinPool(
          userWalletAddress,
          this.referral,
          this.poolInfo.controller,
          request
        )
        .call({ from: userWalletAddress })

      investAmountOut = response.amountToRecipient

      return {
        investAmountOut,
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
    data,
    transactionCallback
  }: JoinSwapAmountInParams) {
    const hasTokenInPool = checkTokenInThePool(
      this.poolInfo.tokens,
      tokenInAddress
    )
    const gasPriceValue = await web3.eth.getGasPrice()

    if (hasTokenInPool) {
      const request = this.createRequestJoinInPool(
        tokenInAddress,
        tokenAmountIn.toString(),
        minPoolAmountOut
      )
      const result = await this.contract.methods
        .joinPool(
          userWalletAddress,
          this.referral,
          this.poolInfo.controller,
          request
        )
        .send(
          {
            from: userWalletAddress,
            gasPrice: new BigNumber(gasPriceValue),
            maxPriorityFeePerGas: 30e9
          },
          transactionCallback
        )

      return result
    }

    const { address: tokenExchange } = checkTokenWithHigherLiquidityPool(
      this.poolInfo.tokens
    )
    const nativeValue =
      tokenInAddress === addressNativeToken1Inch
        ? tokenAmountIn
        : new BigNumber(0)

    const res = await this.contract.methods
      .joinPoolExactTokenInWithSwap(
        {
          recipient: userWalletAddress,
          referrer: this.referral,
          controller: this.poolInfo.controller,
          tokenIn: tokenInAddress,
          tokenAmountIn: tokenAmountIn.toString(),
          tokenExchange,
          minTokenAmountOut: minPoolAmountOut.toString()
        },
        data
      )
      .send({
        from: userWalletAddress,
        value: nativeValue,
        gasPrice: new BigNumber(gasPriceValue),
        maxPriorityFeePerGas: 30e9
      })

    return res
  }

  async estimatedGas({
    userWalletAddress,
    tokenInAddress,
    minPoolAmountOut,
    amountTokenIn,
    data
  }: EstimatedGasParams) {
    const response = checkTokenWithHigherLiquidityPool(this.poolInfo.tokens)

    const gasPrice = await web3.eth.getGasPrice()
    const estimateGas = await this.contract.methods
      .joinPoolExactTokenInWithSwap(
        this.poolInfo.id,
        tokenInAddress,
        amountTokenIn,
        response.address,
        minPoolAmountOut,
        data
      )
      .estimateGas({ from: userWalletAddress, value: amountTokenIn })

    const fee = Number(gasPrice) * estimateGas * 1.3
    const finalGasInEther = web3.utils.fromWei(fee.toString(), 'ether')

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

    const userData = web3.eth.abi.encodeParameters(
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
      let response = await this.balancerHelpersContract.methods
        .queryExit(
          this.poolInfo.id,
          userWalletAddress,
          userWalletAddress,
          request
        )
        .call({ from: userWalletAddress })

      withdrawAmoutOut = response.amountsOut[indexToken]

      response = await this.vaultBalancer.methods
        .exitPool(
          this.poolInfo.id,
          userWalletAddress,
          userWalletAddress,
          request
        )
        .call({ from: userWalletAddress })

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
    const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
    const userData = web3.eth.abi.encodeParameters(
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
      const response = await this.balancerHelpersContract.methods
        .queryExit(
          this.poolInfo.id,
          userWalletAddress,
          userWalletAddress,
          request
        )
        .call({ from: userWalletAddress })

      allAmountsOut = response.amountsOut.slice(1, response.amountsOut.length)

      await this.vaultBalancer.methods
        .exitPool(
          this.poolInfo.id,
          userWalletAddress,
          userWalletAddress,
          request
        )
        .call({ from: userWalletAddress })

      return {
        withdrawAllAmoutOut: allAmountsOut.map(
          (item: string) => new BigNumber(item)
        ),
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
        withdrawAllAmoutOut: allAmountsOut.map(
          (item: string) => new BigNumber(item)
        ),
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

      const userData = web3.eth.abi.encodeParameters(
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

      await this.vaultBalancer.methods
        .exitPool(
          this.poolInfo.id,
          userWalletAddress,
          userWalletAddress,
          request
        )
        .send(
          { from: userWalletAddress, maxPriorityFeePerGas: 30e9 },
          transactionCallback
        )
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
      const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]
      const userData = web3.eth.abi.encodeParameters(
        ['uint256', 'uint256'],
        [1, tokenAmountIn.toString()]
      )

      const minAmountsOutTokens = amountAllTokenOut.map(item => {
        return item.mul(slippageBase).div(slippageExp).toString()
      })

      const request = {
        assets,
        minAmountsOut: [0, ...minAmountsOutTokens],
        userData,
        toInternalBalance: false
      }

      await this.vaultBalancer.methods
        .exitPool(
          this.poolInfo.id,
          userWalletAddress,
          userWalletAddress,
          request
        )
        .send(
          { from: userWalletAddress, maxPriorityFeePerGas: 30e9 },
          transactionCallback
        )
    } catch (error) {
      console.log(error)
    }
  }
}
