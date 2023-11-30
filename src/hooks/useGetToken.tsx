import { NATIVE_ADDRESS } from '@/constants/tokenAddresses'
import { CoinsMetadataType } from '@/hooks/query/useTokensData'

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

    return tokens[_address]?.usd?.toString() ?? '0'
  }

  return { priceToken }
}

export default useGetToken
