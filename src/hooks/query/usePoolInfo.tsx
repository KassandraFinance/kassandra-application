import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolInfoProps = {
  id: string
  day: number
}

export const fetchPoolInfo = async ({ id, day }: UsePoolInfoProps) => {
  return kassandraClient.PoolInfo({ id, day }).then(res => res.pool)
}

export const usePoolInfo = ({ id, day }: UsePoolInfoProps) => {
  return useQuery({
    queryKey: ['pool-info', id],
    queryFn: async () => fetchPoolInfo({ id, day }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
