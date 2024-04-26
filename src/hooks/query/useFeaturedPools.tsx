import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseFeaturedPoolsProps = {
  day: number
  month: number
  period_selected: number
  price_period: number
  chainIn: string[]
}

export const fetchFeaturedPools = async ({
  day,
  month,
  period_selected,
  price_period,
  chainIn
}: UseFeaturedPoolsProps) => {
  return kassandraClient
    .FeaturedPools({ day, month, period_selected, price_period, chainIn })
    .then(res => {
      if (!res?.poolsKassandra) {
        return null
      }

      return res
    })
}

export const useFeaturedPools = ({
  day,
  month,
  period_selected,
  price_period,
  chainIn
}: UseFeaturedPoolsProps) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['featured-pools', chainIn],
    queryFn: async () =>
      fetchFeaturedPools({
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
