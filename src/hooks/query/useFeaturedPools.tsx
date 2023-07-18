import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

export const fetchFeaturedPools = async () => {
  return kassandraClient.FeaturedPools().then(res => {
    if (!res) {
      return null
    }

    const poolsId = res.pools.reduce(
      (acc, { featured, id }) => {
        if (featured) {
          acc.poolsKassandra.push({ id })
        }
        return acc
      },
      {
        poolsKassandra: [] as Array<{ id: string }>
      }
    )

    return poolsId
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
