import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

export const fetchFeaturedPools = async () => {
  return kassandraClient.FeaturedPools().then(res => {
    if (!res?.poolsKassandra) {
      return null
    }

    return res
  })
}

export const useFeaturedPools = () => {
  return useQuery({
    queryKey: ['featured-pools'],
    queryFn: async () => fetchFeaturedPools(),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
