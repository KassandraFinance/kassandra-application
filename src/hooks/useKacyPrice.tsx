import useSWR from 'swr'

import { COINS_METADATA } from '../constants/tokenAddresses'
import { Kacy } from '../constants/tokenAddresses'

type CoinsMetadataType = {
  [key: string]: {
    usd: number
    usd_24h_change: number
    usd_market_cap: number
  }
}

type CoinsMetadataResultType = {
  id: string
  contractAddress: string
  contractName: string
  name: string
  symbol: string
  price: string
  image: string
  priceChangeIn24h: number
  priceChangePercentage7d: number
  volume: number
  marketCap: number
  sparkline: string[]
}[]

const useKacyPrice = () => {
  const { data: kacyData } = useSWR<CoinsMetadataResultType>(
    `${COINS_METADATA}/coins/contracts?name=avalanche` +
      '&addressesSeparatedByComma=' +
      `${Kacy.toLowerCase()}`
  )

  const data: CoinsMetadataType = {}
  if (kacyData) {
    kacyData.forEach(token =>
      Object.assign(data, {
        [token.contractAddress]: {
          usd: token.price,
          usd_24h_change: token.priceChangeIn24h,
          usd_market_cap: token.marketCap
        }
      })
    )
  }

  return { data: kacyData ? data : undefined }
}

export default useKacyPrice
