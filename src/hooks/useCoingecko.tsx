import React from 'react'
import useSWR from 'swr'

import {
  addressNativeToken1Inch,
  COINGECKO_API
} from '../constants/tokenAddresses'

type CoinGeckoResponseType = {
  [key: string]: {
    usd: number,
    usd_24h_change: number
  }
}

const useCoingecko = (
  nativeTokenName: string,
  nativeTokenAddress: string,
  tokenAddresses: string
) => {
  const nativeAddress = nativeTokenAddress

  const { data } = useSWR<CoinGeckoResponseType>(
    `${COINGECKO_API}/simple/token_price/${nativeTokenName}?contract_addresses=${tokenAddresses}&vs_currencies=usd&include_24hr_change=true`
  )

  const priceToken = (address: string) => {
    let _address = address
    if (address === addressNativeToken1Inch) {
      _address = nativeAddress
    }
    return data?.[_address]?.usd
  }

  return { data, priceToken }
}

export default useCoingecko
