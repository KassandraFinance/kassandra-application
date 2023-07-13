import { NATIVE_ADDRESS } from '../constants/tokenAddresses'

export type CoinsMetadataType = {
  [key: string]: {
    heimdallId: string
    name: string
    symbol: string
    logo: string
    usd: string
    marketCap: number
    volume: number
    pricePercentageChangeIn24h: number
    pricePercentageChangeIn7d: number
    sparklineFrom7d: number[]
    decimals: number
  }
}

const useGetToken = ({
  nativeTokenAddress,
  tokens
}: {
  nativeTokenAddress: string
  tokens: CoinsMetadataType
}) => {
  const nativeAddress = nativeTokenAddress

  const priceToken = (address: string) => {
    let _address = address
    if (address === NATIVE_ADDRESS) {
      _address = nativeAddress
    }

    return tokens[_address]?.usd ?? '0'
  }

  return { priceToken }
}

export default useGetToken
