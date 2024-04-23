import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

export const fetchExploreOverviewPools = async () => {
  return kassandraClient.ExploreOverviewPools().then(res => res.kassandras)
}

export const useExploreOverviewPools = () => {
  return useQuery({
    queryKey: ['explore-overview-pools'],
    queryFn: async () => fetchExploreOverviewPools()
  })
}
