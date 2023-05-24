import { ISwapProvider, GetAmountsParams } from './ISwapProvider'
import Big from 'big.js'

export class ParaSwap implements ISwapProvider {
  private readonly baseUrl = 'https://apiv5.paraswap.io'
  private txs: Array<any> = []

  private formatParams(queryParams: Record<string, string>) {
    const searchString = new URLSearchParams(queryParams)
    return searchString
  }

  async getDatasTx(chainId: string, proxy: string) {
    const txURL = `${this.baseUrl}/transactions/${chainId}?gasPrice=50000000000&ignoreChecks=true&ignoreGasEstimate=false&onlyParams=false`
    const requests = this.txs.map(async tx => {
      const txConfig = {
        priceRoute: tx,
        srcToken: tx.srcToken,
        srcDecimals: tx.srcDecimals,
        destToken: tx.destToken,
        destDecimals: tx.destDecimals,
        srcAmount: tx.srcAmount,
        destAmount: Big(tx.destAmount).mul('0.99').toFixed(0),
        userAddress: proxy,
        partner: tx.partner,
        receiver: proxy
      }
      const resJson = await fetch(txURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify(txConfig)
      })
      const response = await resJson.json()
      return response.data
    })
    const datas = await Promise.all(requests)
    return datas
  }

  async getAmountsOut(params: GetAmountsParams) {
    const { srcToken, destTokens, amount, srcDecimals, chainId } = params
    this.txs = []

    const datasTx: Array<string> = []
    const amountsIn: Array<string> = []

    const requests = destTokens.map(async asset => {
      if (srcToken.toLowerCase() === asset.token.id.toLowerCase()) {
        return Promise.resolve(
          Big(amount).mul(asset.weight_normalized).toFixed(0)
        )
      }
      const query = this.formatParams({
        srcToken,
        srcDecimals,
        destToken: asset.token.id,
        destDecimals: asset.token.decimals.toString(),
        amount: Big(amount).mul(asset.weight_normalized).toFixed(0),
        side: 'SELL',
        network: chainId
      })
      const resJson = await fetch(`${this.baseUrl}/prices?${query}`)
      const response = resJson.json()
      return response
    })

    const amounts = await Promise.all(requests)

    const _size = amounts.length
    for (let index = 0; index < _size; index++) {
      const data = amounts[index]
      if (data?.priceRoute) {
        this.txs.push(data.priceRoute)
        amountsIn.push(data.priceRoute.destAmount)
      } else {
        amountsIn.push(data)
      }
    }

    return {
      amountsTokenIn: amountsIn,
      transactionsDataTx: datasTx
    }
  }
}
