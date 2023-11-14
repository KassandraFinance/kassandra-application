import { URL_PARASWAP } from '@/constants/tokenAddresses'
import { ISwapProvider, GetAmountsOutParams } from './ISwapProvider'
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

      return response
    })
    const datas = await Promise.all(requests)

    console.log('datas', datas)
    return datas
  }

  async getAmountsOut(params: GetAmountsOutParams) {
    const { srcToken, destToken, chainId } = params
    const transactionsDataTx = []
    const amountsToken: Array<string> = []

    const requests = srcToken.flatMap(srcAsset => {
      return destToken.map(async destAsset => {
        // if (srcAsset.id.toLowerCase() === destAsset.id.toLowerCase()) {
        //   return Promise.resolve(srcAsset.amount ?? destAsset.amount ?? '0')
        // }
        const query = this.formatParams({
          srcToken: srcAsset.id,
          srcDecimals: srcAsset.decimals?.toString() || '18',
          destToken: destAsset.id,
          destDecimals: destAsset.decimals?.toString() || '18',
          amount: srcAsset.amount ?? destAsset.amount ?? '0',
          side: 'SELL',
          network: chainId
        })

        const resJson = await fetch(`${this.baseUrl}/prices?${query}`)
        const response = resJson.json()
        return response
      })
    })

    console.log(
      'srcTokens',
      srcToken.map(item => item.id)
    )
    const amounts = await Promise.all(requests)

    console.log('AMOUNTS', amounts)
    const _size = amounts.length
    for (let index = 0; index < _size; index++) {
      const data = amounts[index]
      if (data?.priceRoute) {
        transactionsDataTx.push(data.priceRoute)
        amountsToken.push(data.priceRoute.destAmount)
      } else {
        amountsToken.push(data)
      }
    }

    return {
      amountsToken,
      transactionsDataTx
    }
  }
}
