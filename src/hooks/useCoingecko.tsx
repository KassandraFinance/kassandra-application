import React from 'react'
import useSWR from 'swr'

import { COINGECKO_API } from '../constants/tokenAddresses'

type CoinGeckoResponseType = {
  [key: string]: {
    usd: number,
    usd_24h_change: number
  }
}

const useCoingecko = (nativeTokenName: string, tokenAddresses: string) => {
  const [coinGecko, setCoinGecko] = React.useState<CoinGeckoResponseType>({
    address: {
      usd: 0,
      usd_24h_change: 0
    }
  })

  const { data } = useSWR<CoinGeckoResponseType>(
    `${COINGECKO_API}/simple/token_price/${nativeTokenName}?contract_addresses=${tokenAddresses}&vs_currencies=usd&include_24hr_change=true`
  )

  React.useEffect(() => {
    if (!data) {
      return
    }

    setCoinGecko(data)
  }, [data])

  return { coinGecko }
}

export default useCoingecko
