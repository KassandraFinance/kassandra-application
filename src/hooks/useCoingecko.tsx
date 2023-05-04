import useSWR from 'swr'

import {
  addressNativeToken1Inch,
  COINGECKO_API,
  Kacy,
  KacyPoligon
} from '../constants/tokenAddresses'
import useKacyPrice from './useKacyPrice'

type CoinGeckoResponseType = {
  [key: string]: {
    usd: number,
    usd_24h_change: number,
    usd_market_cap: number
  }
}

const useCoingecko = (
  nativeTokenName: string,
  nativeTokenAddress: string,
  tokenAddresses: string[]
) => {
  const nativeAddress = nativeTokenAddress
  const { data: dataKacy } = useKacyPrice()

  const { data: dataOne } = useSWR<CoinGeckoResponseType>(
    `${COINGECKO_API}/simple/token_price/${nativeTokenName}?contract_addresses=${tokenAddresses
      .slice(0, 130)
      .toString()}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
  )

  const { data: dataTwo } = useSWR<CoinGeckoResponseType>(
    tokenAddresses.length > 130
      ? `${COINGECKO_API}/simple/token_price/${nativeTokenName}?contract_addresses=${tokenAddresses
          .slice(130, tokenAddresses.length)
          .toString()}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
      : null
  )

  const data = !dataOne
    ? undefined
    : dataTwo
    ? Object.assign(dataOne, dataTwo)
    : dataOne

  dataKacy &&
    data &&
    Object.assign(data, {
      [KacyPoligon.toLowerCase()]: dataKacy[Kacy.toLowerCase()]
    })

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
