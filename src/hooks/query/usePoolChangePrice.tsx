import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolChangePriceType = {
  id: string
  week: number
  month: number
  year: number
}

type UsePoolChangePriceProps = {
  id: string
  week: number
  month: number
  year: number
  enabled?: boolean
}

export const fetchPoolChangePrice = async ({
  id,
  week,
  month,
  year
}: UsePoolChangePriceType) => {
  return kassandraClient
    .PoolChangePrice({ id, week, month, year })
    .then(res => res.pool)
}

export const usePoolChangePrice = ({
  id,
  week,
  month,
  year,
  enabled = true
}: UsePoolChangePriceProps) => {
  return useQuery({
    queryKey: ['pool-change-price', id],
    queryFn: async () => fetchPoolChangePrice({ id, week, month, year }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: enabled
  })
}
