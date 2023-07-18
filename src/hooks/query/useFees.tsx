import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseFeesProps = {
  poolId: string
}

export const fetchFees = async ({ poolId }: UseFeesProps) => {
  return kassandraClient.Fees({ poolId }).then(res => res.pool)
}

export const useFees = ({ poolId }: UseFeesProps) => {
  return useQuery({
    queryKey: ['fees', poolId],
    queryFn: async () =>
      fetchFees({
        poolId
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
