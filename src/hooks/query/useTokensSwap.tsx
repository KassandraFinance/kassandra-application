import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type TokensSwapOptions = {
  chainId: number
}

export const tokenSwap = async ({ chainId }: TokensSwapOptions) => {
  return kassandraClient.tokensSwap({ chainId }).then(res => res.tokens)
}

export const useTokenSwap = ({ chainId }: TokensSwapOptions) => {
  return useQuery({
    queryKey: ['tokens-swap', chainId],
    queryFn: () =>
      tokenSwap({
        chainId
      }),
    enabled: chainId !== 0,
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3
  })
}
