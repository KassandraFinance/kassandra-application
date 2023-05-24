/* eslint-disable prettier/prettier */
import BigNumber from 'bn.js'
import Big from 'big.js'

import { ItokenSelectedProps } from './operationV1'
import { underlyingAssetsInfo } from '../store/reducers/pool'
import { TransactionCallback } from '../utils/txWait'
import { GetAmountsParams, GetAmountsResult } from './ISwapProvider'

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
  exitswapPoolAmountIn: (params: ExitSwapPoolAmountInParams) => Promise<void>
  exitswapPoolAllTokenAmountIn: (
    params: ExitSwapPoolAllTokenAmountInParams
  ) => Promise<void>
  getDatasTx: () => Promise<Array<string>>
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
  minAmountOut: BigNumber
  selectedTokenInBalance: Big
  amountTokenIn: Big
  tokenInAddress: string
}

export type CalcAmountOutParamsResult = {
  investAmountOut: BigNumber
  transactionError: string | undefined
}

export type JoinSwapAmountInParams = {
  tokenInAddress: string
  tokenAmountIn: BigNumber
  minPoolAmountOut: BigNumber
  userWalletAddress: string
  data: any
  hasTokenInPool: boolean
  transactionCallback: TransactionCallback
}

export type EstimatedGasParams = {
  userWalletAddress: string
  tokenInAddress: string
  minPoolAmountOut: BigNumber
  amountTokenIn: BigNumber
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
  withdrawAmoutOut: BigNumber
  transactionError: string | undefined
}

export type CalcAllOutGivenPoolInParams = {
  poolAmountIn: Big
  userWalletAddress: string
  selectedTokenInBalance: Big
}

export type CalcAllOutGivenPoolInResult = {
  withdrawAllAmoutOut: BigNumber[] | undefined
  transactionError: string | undefined
}

export type ExitSwapPoolAmountInParams = {
  tokenOutAddress: string
  tokenAmountIn: BigNumber
  minPoolAmountOut: BigNumber
  userWalletAddress: string
  transactionCallback: TransactionCallback
}

export type ExitSwapPoolAllTokenAmountInParams = {
  tokenAmountIn: BigNumber
  amountAllTokenOut: BigNumber[]
  slippageBase: BigNumber
  slippageExp: BigNumber
  userWalletAddress: string
  transactionCallback: TransactionCallback
}
