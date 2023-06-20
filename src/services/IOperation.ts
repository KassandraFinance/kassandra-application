import Big from 'big.js'

import { ItokenSelectedProps } from './operationV1'
import { underlyingAssetsInfo } from '../store/reducers/pool'
import { GetAmountsParams, GetAmountsResult } from './ISwapProvider'
import { ContractTransactionResponse } from 'ethers'

export interface IOperations {
  contractAddress: string
  withdrawContract: string
  calcInvestAmountOut: (
    params: CalcAmountOutParams
  ) => Promise<CalcAmountOutParamsResult>
  joinswapExternAmountIn: (params: JoinSwapAmountInParams) => Promise<void>
  estimatedGas: (params: EstimatedGasParams) => Promise<EstimatedGasResult>
  calcSingleOutGivenPoolIn: (
    params: CalcSingleOutGivenPoolInParams
  ) => Promise<CalcSingleOutGivenPoolInResult>
  calcAllOutGivenPoolIn: (
    params: CalcAllOutGivenPoolInParams
  ) => Promise<CalcAllOutGivenPoolInResult>
  exitswapPoolAmountIn: (
    params: ExitSwapPoolAmountInParams
  ) => Promise<ContractTransactionResponse>
  exitswapPoolAllTokenAmountIn: (
    params: ExitSwapPoolAllTokenAmountInParams
  ) => Promise<ContractTransactionResponse>
  getDatasTx: (slippage: string) => Promise<Array<string>>
  getAmountsOut: (params: GetAmountsParams) => Promise<GetAmountsResult>
}

export type IPoolInfoProps = {
  address: string
  id: string
  controller: string
  vault: string
  tokens: underlyingAssetsInfo[]
  tokensAddresses: string[]
  chainId: string
}

export type CalcAmountOutParams = {
  tokenSelected: ItokenSelectedProps
  userWalletAddress: string
  minAmountOut: bigint
  selectedTokenInBalance: Big
  amountTokenIn: Big
  tokenInAddress: string
}

export type CalcAmountOutParamsResult = {
  investAmountOut: bigint
  transactionError: string | undefined
}

export type JoinSwapAmountInParams = {
  tokenInAddress: string
  tokenAmountIn: string
  minPoolAmountOut: string
  userWalletAddress: string
  data: any
  hasTokenInPool: boolean
  slippage: string
}

export type EstimatedGasParams = {
  userWalletAddress: string
  tokenInAddress: string
  minPoolAmountOut: string
  amountTokenIn: string
  data: any
}

export type EstimatedGasResult = {
  feeNumber: number
  feeString: string
}

export type CalcSingleOutGivenPoolInParams = {
  tokenInAddress: string
  tokenSelectAddress: string
  poolAmountIn: string
  isWrap: boolean
  userWalletAddress: string
  selectedTokenInBalance: Big
}

export type CalcSingleOutGivenPoolInResult = {
  withdrawAmoutOut: Big
  transactionError: string | undefined
}

export type CalcAllOutGivenPoolInParams = {
  poolAmountIn: Big
  userWalletAddress: string
  selectedTokenInBalance: Big
}

export type CalcAllOutGivenPoolInResult = {
  withdrawAllAmoutOut: Record<string, Big> | undefined
  transactionError: string | undefined
}

export type ExitSwapPoolAmountInParams = {
  tokenOutAddress: string
  tokenAmountIn: string
  minPoolAmountOut: string
  userWalletAddress: string
}

export type ExitSwapPoolAllTokenAmountInParams = {
  tokenAmountIn: string
  amountAllTokenOut: Record<string, Big>
  slippageBase: Big
  slippageExp: Big
  userWalletAddress: string
}
