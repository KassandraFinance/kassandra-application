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
  tokenAddresses: string[]
) => {
  const nativeAddress = nativeTokenAddress

  const { data: dataOne } = useSWR<CoinGeckoResponseType>(
    `${COINGECKO_API}/simple/token_price/${nativeTokenName}?contract_addresses=${tokenAddresses
      .slice(0, 130)
      .toString()}&vs_currencies=usd&include_24hr_change=true`
  )

  const { data: dataTwo } = useSWR<CoinGeckoResponseType>(
    tokenAddresses.length > 130
      ? `${COINGECKO_API}/simple/token_price/${nativeTokenName}?contract_addresses=${tokenAddresses
          .slice(130, tokenAddresses.length)
          .toString()}&vs_currencies=usd&include_24hr_change=true`
      : null
  )

  const data = !dataOne
    ? null
    : dataTwo
    ? Object.assign(dataOne, dataTwo)
    : dataOne

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
