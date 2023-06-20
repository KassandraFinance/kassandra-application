type Asset = {
  token: {
    id: string
    decimals: number
  }
  weight_normalized: string
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
    slippage: string
  ) => Promise<Array<string>>
  getAmountsOut: (params: GetAmountsParams) => Promise<GetAmountsResult>
}
