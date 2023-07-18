import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolJoinsType = {
  id: string
  timestamp: number
}

export const fetchPoolJoins = async ({ id, timestamp }: UsePoolJoinsType) => {
  return kassandraClient.PoolJoins({ id, timestamp }).then(res => res.pool)
}

export const usePoolJoins = ({ id, timestamp }: UsePoolJoinsType) => {
  return useQuery({
    queryKey: ['pool-joins', id, timestamp],
    queryFn: async () => fetchPoolJoins({ id, timestamp }),
    keepPreviousData: true
  })
}
