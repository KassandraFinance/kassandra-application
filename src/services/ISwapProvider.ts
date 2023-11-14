type Token = {
  id: string
  amount?: string
  decimals: number
}

export type GetAmountsOutParams = {
  chainId: string
  srcToken: Token[]
  destToken: Token[]
}

export type GetAmountsResult = {
  amountsToken: string[]
  transactionsDataTx: string[]
}

export interface ISwapProvider {
  getDatasTx: (
    chainId: string,
    proxy: string,
    slippage: string,
    txs: Array<any>
  ) => Promise<Array<string>>
  getAmountsOut: (params: GetAmountsOutParams) => Promise<GetAmountsResult>
}
