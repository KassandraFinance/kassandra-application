import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

export const fetchPools = async () => {
  return kassandraClient.Pools().then(res => res.pools)
}

export const usePools = () => {
  return useQuery({
    queryKey: ['pools'],
    queryFn: async () => fetchPools()
  })
}
