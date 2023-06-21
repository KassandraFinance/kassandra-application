import useSWR from 'swr'

import { NATIVE_ADDRESS } from '../constants/tokenAddresses'

type CoinsMetadataType = {
  [key: string]: {
    heimdallId: string
    name: string
    symbol: string
    logo: string
    usd: number
    marketCap: number
    volume: number
    pricePercentageChangeIn24h: number
    pricePercentageChangeIn7d: number
    sparklineFrom7d: number[]
  }
}

type Response = {
  message: string
  tokens: CoinsMetadataType
}

const useCoingecko = (
  chainId: number,
  nativeTokenAddress: string,
  tokenAddresses: string[]
) => {
  const nativeAddress = nativeTokenAddress

  const { data } = useSWR<Response>(
    `/api/tokens?chainId=` +
      `${chainId}` +
      '&addressesSeparatedByComma=' +
      `${tokenAddresses.slice(0, 130).toString()}`,
    url =>
      fetch(url, {
        method: 'GET'
      }).then(res => res.json()),
    {
      refreshInterval: 60 * 60 * 5 * 1000
    }
  )

  const { data: dataTwo } = useSWR<Response>(
    tokenAddresses.length > 130
      ? `/api/tokens?chainId=` +
          `${chainId}` +
          '&addressesSeparatedByComma=' +
          `${tokenAddresses.slice(130, tokenAddresses.length).toString()}`
      : null,
    url =>
      fetch(url, {
        method: 'GET'
      }).then(res => res.json()),
    {
      refreshInterval: 60 * 60 * 5 * 1000
    }
  )

  if (dataTwo && data) {
    Object.assign(data.tokens, {
      ...dataTwo.tokens
    })
  }
  const priceToken = (address: string) => {
    let _address = address
    if (address === NATIVE_ADDRESS) {
      _address = nativeAddress
    }

    return data?.tokens[_address]?.usd ?? 0
  }

  return { data: data?.tokens, priceToken }
}

export default useCoingecko
