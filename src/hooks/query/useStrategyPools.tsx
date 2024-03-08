import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'ethers'

import { kassandraClient } from '@/graphQLClients'

type StrategyPools = {
  strategy: string
}

export const fetchStrategyPools = async ({ strategy }: StrategyPools) => {
  return kassandraClient.StrategyPool({ strategy }).then(res => res.pools)
}

export const useStrategyPools = ({
  strategy
}: {
  strategy: string | undefined
}) => {
  const id = strategy ? getAddress(strategy) : ''
  return useQuery({
    queryKey: ['strategy-pools', id],
    queryFn: async () =>
      fetchStrategyPools({
        strategy: id
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: id.length > 0
  })
}
