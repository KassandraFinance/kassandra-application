import Big from 'big.js'

import { ItokenSelectedProps } from './operationV1'
import { ContractTransactionResponse } from 'ethers'
import { GetAmountsOutParams, GetAmountsResult } from './ISwapProvider'

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
  getDatasTx: (slippage: string, txs: Array<any>) => Promise<Array<string>>
  getAmountsOut: (params: GetAmountsOutParams) => Promise<GetAmountsResult>
}

export type IPoolInfoProps = {
  id: string | undefined
  address: string
  controller: string
  vault: string
  tokens: {
    __typename?: 'Asset' | undefined
    balance: string
    weight_normalized: string
    weight_goal_normalized: string
    token: {
      __typename?: 'Token' | undefined
      id: string
      name: string
      logo?: string | null | undefined
      symbol: string
      decimals: number
      is_wrap_token: number
      wraps?:
        | {
            __typename?: 'Token' | undefined
            id: string
            decimals: number
            symbol: string
            name: string
            logo?: string | null | undefined
          }
        | null
        | undefined
    }
  }[]
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
  investAmountOutWithoutFees?: string
  transactionError: string | undefined
}

export type JoinSwapAmountInParams = {
  tokenInAddress: string
  tokenAmountIn: string
  minPoolAmountOut: string
  userWalletAddress: string
  referrerAddress: string
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
  tokenSelect: {
    address: string
    decimals: number
  }
  tokenInAddress: string
  poolAmountIn: string
  isWrap: boolean
  userWalletAddress: string
  selectedTokenInBalance: Big
}

export type CalcSingleOutGivenPoolInResult = {
  amountOutList?: Big[]
  transactionsDataTx?: string[]
  withdrawAmoutOut?: Big
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
  minPoolAmountsOut: string[]
  userWalletAddress: string
  trasactionData?: string[]
}

export type ExitSwapPoolAllTokenAmountInParams = {
  tokenAmountIn: string
  amountAllTokenOut: Record<string, Big>
  slippageBase: Big
  slippageExp: Big
  userWalletAddress: string
}
