import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseBrokersProps = {
  poolId: string
  first: number
  skip: number
}

export const fetchBrokers = async ({
  poolId,
  first,
  skip
}: UseBrokersProps) => {
  return kassandraClient.Brokers({ poolId, first, skip }).then(res => res.pools)
}

export const useBrokers = ({ poolId, first, skip }: UseBrokersProps) => {
  return useQuery({
    queryKey: ['brokers', poolId, first, skip],
    queryFn: async () =>
      fetchBrokers({
        poolId,
        first,
        skip
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true
  })
}
