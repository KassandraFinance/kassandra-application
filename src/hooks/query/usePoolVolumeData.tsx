import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type IPoolVolumeDataProps = {
  poolId: string
  timestamp: number
}

export const fetchPoolVolumeData = async ({
  poolId,
  timestamp
}: IPoolVolumeDataProps) => {
  return kassandraClient
    .PoolVolumeData({ id: poolId, timestamp })
    .then(res => res.pool)
}

export const usePoolVolumeData = ({
  poolId,
  timestamp
}: IPoolVolumeDataProps) => {
  return useQuery({
    queryKey: ['pool-volume-data', poolId, timestamp],
    queryFn: async () =>
      fetchPoolVolumeData({
        poolId,
        timestamp
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
