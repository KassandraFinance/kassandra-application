import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseFeaturedPoolsProps = {
  month: number
  period_selected: number
  price_period: number
  chainIn: string[]
}

export const fetchFeaturedPools = async ({
  month,
  period_selected,
  price_period,
  chainIn
}: UseFeaturedPoolsProps) => {
  return kassandraClient
    .FeaturedPools({ month, period_selected, price_period, chainIn })
    .then(res => {
      if (!res.pools) {
        return null
      }

      return res
    })
}

export const useFeaturedPools = ({
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
        month,
        period_selected,
        price_period,
        chainIn
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
