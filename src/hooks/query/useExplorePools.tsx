import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'
import { OrderDirection, Pool_OrderBy } from '@/gql/generated/kassandraApi'

type FetchExplorePools = {
  month: number
  period_selected: number
  price_period: number
  chainIn: string[]
  orderDirection: OrderDirection
  orderBy: Pool_OrderBy
  totalValueLockedUsdGt?: string
}

type UseLargestPoolsProps = {
  month: number
  period_selected: number
  price_period: number
  chainIn: string[]
  orderDirection: OrderDirection
  orderBy: Pool_OrderBy
  queryKey: string
  totalValueLockedUsdGt?: string
}

export const fetchExplorePools = async ({
  month,
  period_selected,
  price_period,
  chainIn,
  orderBy,
  orderDirection,
  totalValueLockedUsdGt = '0'
}: FetchExplorePools) => {
  return kassandraClient
    .ExplorePools({
      month,
      period_selected,
      price_period,
      chainIn,
      orderBy,
      orderDirection,
      totalValueLockedUsdGt
    })
    .then(res => res)
}

export const useExplorePools = ({
  month,
  period_selected,
  price_period,
  chainIn,
  orderBy,
  orderDirection,
  queryKey,
  totalValueLockedUsdGt
}: UseLargestPoolsProps) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [`${queryKey}-pools`, chainIn],
    queryFn: async () =>
      fetchExplorePools({
        month,
        period_selected,
        price_period,
        chainIn,
        orderBy,
        orderDirection,
        totalValueLockedUsdGt
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
