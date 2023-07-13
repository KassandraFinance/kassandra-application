import { useQuery } from '@tanstack/react-query'

type UseTokensDataProps = {
  chainId: number
  tokenAddresses: string[]
}

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

export const fetchTokensData = async ({
  chainId,
  tokenAddresses
}: UseTokensDataProps): Promise<CoinsMetadataType> => {
  const dataOne = await fetch(
    `/api/tokens?chainId=` +
      `${chainId}` +
      '&addressesSeparatedByComma=' +
      `${tokenAddresses.slice(0, 130).toString()}`
  ).then(res => res.json())

  const dataTwo =
    tokenAddresses.length > 130
      ? await fetch(
          `/api/tokens?chainId=` +
            `${chainId}` +
            '&addressesSeparatedByComma=' +
            `${tokenAddresses.slice(130, tokenAddresses.length).toString()}`
        ).then(res => res.json())
      : null

  if (dataTwo && dataOne) {
    Object.assign(dataOne.tokens, {
      ...dataTwo.tokens
    })
  }

  return dataOne?.tokens
}

export const useTokensData = ({
  chainId,
  tokenAddresses
}: UseTokensDataProps) => {
  return useQuery({
    queryKey: ['tokens-data', chainId, tokenAddresses],
    queryFn: async () =>
      fetchTokensData({
        chainId,
        tokenAddresses
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: tokenAddresses.length > 0 && chainId !== 0
  })
}
