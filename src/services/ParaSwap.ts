import { URL_PARASWAP } from '@/constants/tokenAddresses'
import { ISwapProvider, GetAmountsParams } from './ISwapProvider'
import Big from 'big.js'

export class ParaSwap implements ISwapProvider {
  private readonly baseUrl = URL_PARASWAP

  private formatParams(queryParams: Record<string, string>) {
    const searchString = new URLSearchParams(queryParams)
    return searchString
  }

  async getDatasTx(
    chainId: string,
    proxy: string,
    slippage: string,
    txs: Array<any>
  ) {
    const slippageFomatted = Number(slippage) / 100
    const totalPercentage = 1

    const txURL = `${this.baseUrl}/transactions/${chainId}?gasPrice=50000000000&ignoreChecks=true&ignoreGasEstimate=false&onlyParams=false`
    const requests = txs.map(async tx => {
      const txConfig = {
        priceRoute: tx,
        srcToken: tx.srcToken,
        srcDecimals: tx.srcDecimals,
        destToken: tx.destToken,
        destDecimals: tx.destDecimals,
        srcAmount: tx.srcAmount,
        destAmount: Big(tx.destAmount)
          .mul(totalPercentage - slippageFomatted)
          .toFixed(0),
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

      if (response?.error) {
        throw { code: 'KASS#01', message: response.error }
      }

      return response.data
    })
    const datas = await Promise.all(requests)

    return datas
  }

  async getAmountsOut(params: GetAmountsParams) {
    const { srcToken, assets, amount, srcDecimals, chainId } = params
    const txs = []

    const amountsIn: Array<string> = []

    const requests = assets.map(async asset => {
      // if (srcToken.toLowerCase() === asset.token.id.toLowerCase()) {
      //   return Promise.resolve(
      //     Big(amount).mul(asset.weight_normalized).toFixed(0)
      //   )
      // }
      const query = this.formatParams({
        srcToken: asset.id,
        srcDecimals: '18',
        destToken: srcToken,
        destDecimals: asset.decimals?.toString() || '18',
        amount: asset.value,
        // amount: Big(amount).mul(asset.weight_normalized).toFixed(0),
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
        txs.push(data.priceRoute)
        amountsIn.push(data.priceRoute.destAmount)
      } else {
        amountsIn.push(data)
      }
    }

    return {
      amountsTokenIn: amountsIn,
      transactionsDataTx: txs
    }
  }

  async getAmounts(params: GetAmountsParams) {
    const { srcToken, assets, amount, srcDecimals, chainId } = params
    const txs = []

    const amountsIn: Array<string> = []

    const requests = assets.map(async asset => {
      const query = this.formatParams({
        srcToken: asset.id,
        srcDecimals: asset.decimals?.toString() || '18',
        destToken: srcToken,
        destDecimals: srcDecimals,
        amount: asset.value,
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
        txs.push(data.priceRoute)
        amountsIn.push(data.priceRoute.destAmount)
      } else {
        amountsIn.push(data)
      }
    }

    return {
      amountsTokenIn: amountsIn,
      transactionsDataTx: txs
    }
  }
}
