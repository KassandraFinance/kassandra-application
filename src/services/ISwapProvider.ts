type Asset = {
  id: string
  decimals: number
  value: string
}

// type SrcToken = {
//   id: string
//   decimals: number
// }
// type DestToken = {
//   id: string
//   decimals: number
// }
// export type GetAmountsParams = {
//   amount: string
//   chainId: string
//   srcToken: SrcToken
//   destToken: DestToken
// }

export type GetAmountsParams = {
  srcToken: string
  srcDecimals: string
  assets: Asset[]
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
