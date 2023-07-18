import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolRebalanceTimeType = {
  id: string
}

export const fetchPoolRebalanceTime = async ({
  id
}: UsePoolRebalanceTimeType) => {
  return kassandraClient
    .PoolRebalanceTime({ id })
    .then(res => res.pool?.weight_goals[0]?.end_timestamp || null)
}

export const usePoolRebalanceTime = ({ id }: UsePoolRebalanceTimeType) => {
  return useQuery({
    queryKey: ['pool-rebalance-time', id],
    queryFn: async () => fetchPoolRebalanceTime({ id })
  })
}
