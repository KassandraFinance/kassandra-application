type Asset =
  | {
      token: {
        id: string
        decimals: number | null | undefined
      }
      weight_normalized: any
    }
  | {
      __typename?: 'Asset' | undefined
      balance: any
      weight_normalized: any
      weight_goal_normalized: any
      token: {
        __typename?: 'Token' | undefined
        id: string
        name?: string | null | undefined
        logo?: string | null | undefined
        symbol?: string | null | undefined
        decimals?: number | null | undefined
        price_usd: any
        is_wrap_token: number
        wraps?:
          | {
              __typename?: 'Token' | undefined
              id: string
              decimals?: number | null | undefined
              price_usd: any
              symbol?: string | null | undefined
              name?: string | null | undefined
              logo?: string | null | undefined
            }
          | null
          | undefined
      }
    }

export type GetAmountsParams = {
  srcToken: string
  srcDecimals: string
  destTokens: Asset[]
  amount: string
  chainId: string
}

export type GetAmountsResult = {
  amountsTokenIn: string[]
  transactionsDataTx: string[]
}

export interface ISwapProvider {
  getDatasTx: (
    chainId: string,
    proxy: string,
    slippage: string,
    txs: Array<any>
  ) => Promise<Array<string>>
  getAmountsOut: (params: GetAmountsParams) => Promise<GetAmountsResult>
}
