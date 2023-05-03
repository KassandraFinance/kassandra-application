import useSWR from 'swr'

import { COINGECKO_API } from '../constants/tokenAddresses'
import { Kacy } from '../constants/tokenAddresses'

type CoinGeckoResponseType = {
  [key: string]: {
    usd: number,
    usd_24h_change: number,
    usd_market_cap: number
  }
}

const useKacyPrice = () => {
  const { data } = useSWR<CoinGeckoResponseType>(
    `${COINGECKO_API}/simple/token_price/avalanche?contract_addresses=${Kacy}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
  )

  const priceToken = (address: string) => {
    return data?.[address]?.usd
  }

  return { data, priceToken }
}

export default useKacyPrice
