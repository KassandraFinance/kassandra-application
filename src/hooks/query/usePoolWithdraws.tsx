import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolWithdrawsType = {
  id: string
  timestamp: number
}

export const fetchPoolWithdraws = async ({
  id,
  timestamp
}: UsePoolWithdrawsType) => {
  return kassandraClient.PoolWithdraws({ id, timestamp }).then(res => res.pool)
}

export const usePoolWithdraws = ({ id, timestamp }: UsePoolWithdrawsType) => {
  return useQuery({
    queryKey: ['pool-withdraws', id, timestamp],
    queryFn: async () => fetchPoolWithdraws({ id, timestamp }),
    keepPreviousData: true
  })
}
