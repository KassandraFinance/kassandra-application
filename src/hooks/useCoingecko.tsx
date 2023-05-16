import useSWR from 'swr'

import {
  addressNativeToken1Inch,
  COINS_METADATA,
  Kacy,
  KacyPoligon
} from '../constants/tokenAddresses'
import useKacyPrice from './useKacyPrice'

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
  priceChangePercentage24h: number
  priceChangePercentage7d: number
  volume: number
  marketCap: number
  sparkline: string[]
}[]

const useCoingecko = (
  nativeTokenName: string,
  nativeTokenAddress: string,
  tokenAddresses: string[]
) => {
  const nativeAddress = nativeTokenAddress
  const { data: dataKacy } = useKacyPrice()

  const { data: dataOne } = useSWR<CoinsMetadataResultType>(
    `${COINS_METADATA}/coins/contracts?name=` +
      `${nativeTokenName}` +
      '&addressesSeparatedByComma=' +
      `${tokenAddresses.slice(0, 130).toString().toLowerCase()}`
  )
  console.log(dataOne)

  const { data: dataTwo } = useSWR<CoinsMetadataResultType>(
    tokenAddresses.length > 130
      ? `${COINS_METADATA}/coins/contracts?name=` +
          `${nativeTokenName}` +
          '&addressesSeparatedByComma=' +
          `${tokenAddresses
            .slice(130, tokenAddresses.length)
            .toString()
            .toLowerCase()}`
      : null
  )

  const data: CoinsMetadataType = {}
  if (dataOne) {
    dataOne.forEach(token =>
      Object.assign(data, {
        [token.contractAddress]: {
          usd: token.price,
          usd_24h_change: token.priceChangePercentage24h,
          usd_market_cap: token.marketCap
        }
      })
    )
  }
  if (dataTwo && dataOne) {
    dataTwo.forEach(token =>
      Object.assign(data, {
        [token.contractAddress]: {
          usd: token.price,
          usd_24h_change: token.priceChangePercentage24h,
          usd_market_cap: token.marketCap
        }
      })
    )
  }

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

    return data[_address]?.usd
  }

  return { data: dataOne ? data : undefined, priceToken }
}

export default useCoingecko
