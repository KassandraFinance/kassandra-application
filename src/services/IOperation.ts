import BigNumber from 'bn.js'
import Big from 'big.js'

import { ItokenSelectedProps } from './operationV1'
import { underlyingAssetsInfo } from '../store/reducers/pool'
import { TransactionCallback } from '../utils/txWait'

export type CalcAmountOutParams = {
  tokenSelected: ItokenSelectedProps,
  userWalletAddress: string,
  minAmountOut: BigNumber,
  selectedTokenInBalance: Big
}

export type CalcAmountOutParamsResult = {
  investAmountOut: BigNumber,
  transactionError: string | undefined
}

export type JoinSwapAmountInParams = {
  tokenInAddress: string,
  tokenAmountIn: BigNumber,
  minPoolAmountOut: BigNumber,
  userWalletAddress: string,
  data: any,
  poolTokenList: underlyingAssetsInfo[],
  transactionCallback: TransactionCallback
}

export type EstimatedGasParams = {
  userWalletAddress: string,
  tokenInAddress: string,
  minPoolAmountOut: BigNumber,
  amountTokenIn: BigNumber,
  data: any,
  poolTokenList: underlyingAssetsInfo[]
}

export type EstimatedGasResult = {
  feeNumber: number,
  feeString: string
}

export type CalcSingleOutGivenPoolInParams = {
  tokenInAddress: string,
  tokenSelectAddress: string,
  poolAmountIn: Big,
  isWrap: boolean,
  userWalletAddress: string,
  selectedTokenInBalance: Big
}

export type CalcSingleOutGivenPoolInResult = {
  withdrawAmoutOut: BigNumber,
  transactionError: string | undefined
}

export type CalcAllOutGivenPoolInParams = {
  poolAmountIn: Big,
  userWalletAddress: string,
  selectedTokenInBalance: Big,
  poolTokenList: underlyingAssetsInfo[]
}

export type CalcAllOutGivenPoolInResult = {
  withdrawAllAmoutOut: BigNumber[] | undefined,
  transactionError: string | undefined
}

export type ExitSwapPoolAmountInParams = {
  tokenOutAddress: string,
  tokenAmountIn: BigNumber,
  minPoolAmountOut: BigNumber,
  userWalletAddress: string,
  transactionCallback: TransactionCallback
}

export type ExitSwapPoolAllTokenAmountInParams = {
  tokenAmountIn: BigNumber,
  amountAllTokenOut: BigNumber[],
  slippageBase: BigNumber,
  slippageExp: BigNumber,
  userWalletAddress: string,
  poolTokenList: underlyingAssetsInfo[],
  transactionCallback: TransactionCallback
}
