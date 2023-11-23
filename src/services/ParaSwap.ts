import { URL_PARASWAP } from '@/constants/tokenAddresses'
import { ISwapProvider, GetAmountsOutParams } from './ISwapProvider'
import { ZeroHash } from 'ethers'
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
      if (!tx?.priceRoute) {
        return Promise.resolve(ZeroHash)
      }

      const txConfig = {
        priceRoute: tx.priceRoute,
        srcToken: tx.priceRoute.srcToken,
        srcDecimals: tx.priceRoute.srcDecimals.toString(),
        destToken: tx.priceRoute.destToken,
        destDecimals: tx.priceRoute.destDecimals.toString(),
        srcAmount: tx.priceRoute.srcAmount,
        destAmount: Big(tx.priceRoute.destAmount)
          .mul(totalPercentage - slippageFomatted)
          .toFixed(0),
        userAddress: proxy,
        partner: tx.priceRoute.partner,
        receiver: proxy
      }
      const response = await fetch(txURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify(txConfig)
      })
      const resJSON = await response.json()

      if (resJSON?.error) {
        throw { code: 'KASS#01', message: resJSON.error }
      }

      return resJSON.data
    })
    const datas = await Promise.all(requests)

    return datas
  }

  async getAmountsOut(params: GetAmountsOutParams) {
    const { srcToken, destToken, chainId, transactionType = 'invest' } = params
    const transactionsDataTx = []
    const tokenAmounts: Array<string> = []

    const requests = srcToken.flatMap(srcAsset => {
      return destToken.map(async destAsset => {
        if (srcAsset.id.toLowerCase() === destAsset.id.toLowerCase()) {
          return Promise.resolve(srcAsset.amount ?? destAsset.amount ?? '0')
        }

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

    const amounts = await Promise.all(requests)

    const _size = amounts.length
    for (let index = 0; index < _size; index++) {
      const data = amounts[index]

      tokenAmounts.push(data?.priceRoute?.destAmount ?? data)

      if (transactionType === 'withdraw') {
        transactionsDataTx.push(data)
      }
      if (transactionType === 'invest' && data?.priceRoute) {
        transactionsDataTx.push(data)
      }
    }

    return {
      tokenAmounts,
      transactionsDataTx
    }
  }
}
