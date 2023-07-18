import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolStrategyProps = {
  id: string
}

export const fetchPoolStrategy = async ({ id }: UsePoolStrategyProps) => {
  return kassandraClient.PoolStrategy({ id }).then(res => res.pool)
}

export const usePoolStrategy = ({ id }: UsePoolStrategyProps) => {
  return useQuery({
    queryKey: ['pool-strategy', id],
    queryFn: async () => fetchPoolStrategy({ id })
  })
}
