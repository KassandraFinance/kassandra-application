import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type TokensSwap = {
  chainId: number
}

export const tokenSwap = async ({ chainId }: TokensSwap) => {
  return kassandraClient.tokensSwap({ chainId }).then(res => res.tokens)
}

export const useTokenSwap = ({ chainId }: TokensSwap) => {
  return useQuery({
    queryKey: ['tokens-swap', chainId],
    queryFn: async () =>
      tokenSwap({
        chainId
      }),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3
  })
}
