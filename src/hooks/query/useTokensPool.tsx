import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseTokensPoolType = {
  id: string
}

export const fetchTokensPool = async ({ id }: UseTokensPoolType) => {
  return kassandraClient.TokensPool({ id }).then(res => res.pool)
}

export const useTokensPool = ({ id }: UseTokensPoolType) => {
  return useQuery({
    queryKey: ['tokens-pool', id],
    queryFn: async () => fetchTokensPool({ id }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
