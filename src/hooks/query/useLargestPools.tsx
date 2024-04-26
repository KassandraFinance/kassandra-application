import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseLargestPoolsProps = {
  day: number
  month: number
  period_selected: number
  price_period: number
  chainIn: string[]
}

export const fetchLargestPools = async ({
  day,
  month,
  period_selected,
  price_period,
  chainIn
}: UseLargestPoolsProps) => {
  return kassandraClient
    .LargestPools({ day, month, period_selected, price_period, chainIn })
    .then(res => res)
}

export const useLargestPools = ({
  day,
  month,
  period_selected,
  price_period,
  chainIn
}: UseLargestPoolsProps) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['Largest-pools', chainIn],
    queryFn: async () =>
      fetchLargestPools({
        day,
        month,
        period_selected,
        price_period,
        chainIn
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
