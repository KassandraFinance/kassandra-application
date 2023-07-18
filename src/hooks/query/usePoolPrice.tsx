import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolPriceProps = {
  id: string
  day: number
  week: number
  quarterly: number
  month: number
  year: number
}

export const fetchPoolPrice = async ({
  id,
  day,
  week,
  quarterly,
  month,
  year
}: UsePoolPriceProps) => {
  return kassandraClient
    .PoolPrice({ id, day, week, quarterly, month, year })
    .then(res => res.pool)
}

export const usePoolPrice = ({
  id,
  day,
  week,
  quarterly,
  month,
  year
}: UsePoolPriceProps) => {
  return useQuery({
    queryKey: ['pool-price', id],
    queryFn: async () =>
      fetchPoolPrice({ id, day, week, quarterly, month, year }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
