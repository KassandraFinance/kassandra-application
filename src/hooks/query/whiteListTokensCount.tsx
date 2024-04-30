import { useQuery } from '@tanstack/react-query'

import { whiteList } from '../useWhiteList'

type WhiteListTokensCount = {
  chainIdList: string[]
}

export const whiteListTokensCount = async ({
  chainIdList
}: WhiteListTokensCount) => {
  let tokenCount = 0
  for (let i = 0; i < chainIdList.length; i++) {
    const chainId = parseInt(chainIdList[i])
    const { countTokens } = whiteList(chainId)

    try {
      const value = await countTokens()
      tokenCount += Number(value)
    } catch (error) {
      tokenCount += 0
    }
  }

  return tokenCount
}

export const useWhiteListTokensCount = ({
  chainIdList
}: WhiteListTokensCount) => {
  return useQuery({
    queryKey: ['white-list-token-count', chainIdList],
    queryFn: async () =>
      whiteListTokensCount({
        chainIdList
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
