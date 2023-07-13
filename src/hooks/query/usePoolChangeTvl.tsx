import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolChangeTvlType = {
  id: string
  week: number
  month: number
  year: number
}

type UsePoolChangeTvlProps = {
  id: string
  week: number
  month: number
  year: number
  enabled?: boolean
}

export const fetchPoolChangeTvl = async ({
  id,
  week,
  month,
  year
}: UsePoolChangeTvlType) => {
  return kassandraClient
    .PoolChangeTvl({ id, week, month, year })
    .then(res => res.pool)
}

export const usePoolChangeTvl = ({
  id,
  week,
  month,
  year,
  enabled = true
}: UsePoolChangeTvlProps) => {
  return useQuery({
    queryKey: ['pool-change-tvl', id],
    queryFn: async () => fetchPoolChangeTvl({ id, week, month, year }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: enabled
  })
}
