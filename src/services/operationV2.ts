import Big from 'big.js'
import {
  BigNumberish,
  Contract,
  JsonRpcProvider,
  JsonRpcSigner,
  ZeroAddress,
  ethers
} from 'ethers'

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
import { GetAmountsOutParams, ISwapProvider } from './ISwapProvider'

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
  referral = ZeroAddress
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

  async getDatasTx(slippage = '0.5', txs: Array<any>) {
    return this.swapProvider.getDatasTx(
      this.poolInfo.chainId,
      this.contractAddress,
      slippage,
      txs
    )
  }

  async getAmountsOut(params: GetAmountsOutParams) {
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

  gasMargin(estimateGas: string) {
    const twentyPercentOfValue = 1.2
    const calculateGas = Big(estimateGas).mul(twentyPercentOfValue).toFixed()
    return BigInt(Math.round(parseFloat(calculateGas)))
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

      return {
        investAmountOut,
        transactionError,
        investAmountOutWithoutFees
      }
    }
  }

  async joinswapExternAmountIn({
    tokenInAddress,
    tokenAmountIn,
    minPoolAmountOut,
    userWalletAddress,
    referrerAddress,
    data,
    slippage
  }: JoinSwapAmountInParams) {
    const { address: tokenExchange } = checkTokenWithHigherLiquidityPool(
      typeof this.poolInfo.tokens === 'string' ? [] : this.poolInfo.tokens
    )
    const nativeValue = tokenInAddress === NATIVE_ADDRESS ? tokenAmountIn : '0'

    const tokenIn =
      tokenInAddress === NATIVE_ADDRESS
        ? networks[Number(this.poolInfo.chainId)].nativeCurrency.address
        : tokenInAddress

    if (!Big(tokenAmountIn).eq(Big(data.amountTokenIn))) {
      throw { code: 'KASS#02', message: 'please recalculate' }
    }

    const datas = await this.getDatasTx(slippage, data.transactionsDataTx)

    if (datas.length < 1) {
      throw { code: 'KASS#02', message: 'please recalculate' }
    }

    const params = {
      recipient: userWalletAddress,
      referrer: referrerAddress,
      controller: this.poolInfo.controller,
      tokenIn,
      tokenAmountIn: tokenAmountIn,
      tokenExchange,
      minTokenAmountOut: minPoolAmountOut
    }
    const options = {
      from: userWalletAddress,
      value: nativeValue
    }

    let gasLimit: BigNumberish | undefined
    const polygonChainId = 137
    if (parseFloat(this.poolInfo.chainId) === polygonChainId) {
      const estimateGas =
        await this.contract.joinPoolExactTokenInWithSwap.estimateGas(
          params,
          datas,
          options
        )

      gasLimit = this.gasMargin(estimateGas.toString())
    }

    const res = await this.contract.joinPoolExactTokenInWithSwap(
      params,
      datas,
      {
        ...options,
        gasLimit
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
      typeof this.poolInfo.tokens === 'string' ? [] : this.poolInfo.tokens
    )

    const tokenIn =
      tokenInAddress === NATIVE_ADDRESS
        ? networks[Number(this.poolInfo.chainId)].nativeCurrency.address
        : tokenInAddress

    const nativeValue = tokenInAddress === NATIVE_ADDRESS ? amountTokenIn : '0'

    const datas = await this.getDatasTx('0.5', data)
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

    const jsonProvider = new JsonRpcProvider(
      networks[parseFloat(this.poolInfo.chainId)].rpc
    )

    const thirtyPercentOfValue = 1.3
    const feeData = await jsonProvider.getFeeData()
    const fee = Big(feeData?.maxFeePerGas?.toString() ?? '0').mul(
      Big(estimateGas.toString() ?? '0').mul(thirtyPercentOfValue)
    )

    return {
      feeNumber: fee.toNumber(),
      feeString: BNtoDecimal(fee.div(Big(10).pow(18)), 3, 6)
    }
  }

  // exit
  async calcSingleOutGivenPoolIn({
    tokenInAddress,
    tokenSelect,
    poolAmountIn,
    isWrap,
    userWalletAddress,
    selectedTokenInBalance
  }: CalcSingleOutGivenPoolInParams) {
    let withdrawAmoutOut
    let transactionError

    const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]

    const userData = new ethers.AbiCoder().encode(
      ['uint256', 'uint256'],
      [1, poolAmountIn]
    )

    const request = {
      assets,
      minAmountsOut: new Array(assets.length).fill(0),
      userData,
      toInternalBalance: false
    }

    try {
      const response = await this.balancerHelpersContract.queryExit.staticCall(
        this.poolInfo.id,
        userWalletAddress,
        userWalletAddress,
        request,
        {
          from: userWalletAddress
        }
      )

      // response = await this.vaultBalancer.exitPool.staticCall(
      //   this.poolInfo.id,
      //   userWalletAddress,
      //   userWalletAddress,
      //   request,
      //   { from: userWalletAddress }
      // )

      const amountsOutList = response.amountsOut.slice(1)
      const poolTokenList = this.poolInfo.tokens.sort((a, b) =>
        a.token.id.toLowerCase() > b.token.id.toLowerCase() ? 1 : -1
      )

      const amountsOutListFormatted: string[] = []
      const assets = poolTokenList.map((token, index) => {
        const amount = Big(amountsOutList[index].toString())
          .mul(10000 - 1)
          .div(10000)
          .toFixed(0)
        amountsOutListFormatted.push(amount)

        return {
          id: token.token.wraps?.id ?? token.token.id,
          decimals: token.token.decimals,
          amount
        }
      })

      const amountList = await this.getAmountsOut({
        chainId: this.poolInfo.chainId,
        srcToken: assets,
        destToken: [
          { id: tokenSelect.address, decimals: tokenSelect.decimals }
        ],
        transactionType: 'withdraw'
      })

      withdrawAmoutOut = amountList.tokenAmounts.reduce(
        (total, current) => (total = total.add(Big(current))),
        Big(0)
      )

      return {
        amountOutList: amountsOutListFormatted,
        transactionsDataTx: amountList.transactionsDataTx,
        transactionError: amountList?.transactionError,
        withdrawAmoutOut
      }
    } catch (error: any) {
      return {
        withdrawAmoutOut,
        transactionError,
        amountOutList: undefined,
        transactionsDataTx: undefined
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
      [1, poolAmountIn.toFixed(0)]
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
          [this.poolInfo.tokensAddresses[i]]: Big(allAmountsOut[i].toString())
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
    userWalletAddress,
    trasactionData,
    minPoolAmountsOut,
    slippageValue
  }: ExitSwapPoolAmountInParams) {
    const assets = [this.poolInfo.address, ...this.poolInfo.tokensAddresses]

    if (!trasactionData) throw new Error('please recalculate')

    const userData = new ethers.AbiCoder().encode(
      ['uint256', 'uint256'],
      [1, tokenAmountIn.toString()]
    )

    const request = {
      assets,
      minAmountsOut: [0, ...minPoolAmountsOut],
      userData,
      toInternalBalance: false
    }

    const transactionsDataTx = await this.getDatasTx(
      slippageValue,
      trasactionData
    )

    let gasLimit: BigNumberish | undefined
    const polygonChainId = 137
    if (parseFloat(this.poolInfo.chainId) === polygonChainId) {
      const estimateGas =
        await this.contract.exitPoolExactTokenInWithSwap.estimateGas(
          userWalletAddress,
          this.poolInfo.controller,
          tokenAmountIn,
          tokenOutAddress,
          minPoolAmountOut,
          request,
          transactionsDataTx,
          {
            gasLimit
          }
        )

      gasLimit = this.gasMargin(estimateGas.toString())
    }

    const res = await this.contract.exitPoolExactTokenInWithSwap(
      userWalletAddress,
      this.poolInfo.controller,
      tokenAmountIn,
      tokenOutAddress,
      minPoolAmountOut,
      request,
      transactionsDataTx,
      {
        gasLimit
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
