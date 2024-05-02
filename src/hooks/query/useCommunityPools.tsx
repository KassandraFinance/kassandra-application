import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'
import { OrderDirection, Pool_OrderBy } from '@/gql/generated/kassandraApi'

type UseCommunityPoolsProps = {
  day: number
  first: number
  month: number
  orderDirection: OrderDirection
  skip: number
  orderBy: Pool_OrderBy
}

export const fetchCommunityPools = async ({
  day,
  first,
  month,
  orderDirection,
  skip,
  orderBy
}: UseCommunityPoolsProps) => {
  return kassandraClient
    .CommunityPools({
      day,
      first,
      month,
      orderDirection,
      skip,
      orderBy
    })
    .then(res => res)
}

export const useCommunityPools = ({
  day,
  first,
  month,
  orderDirection,
  skip,
  orderBy
}: UseCommunityPoolsProps) => {
  return useQuery({
    queryKey: [
      'community-pools',
      day,
      first,
      month,
      orderDirection,
      skip,
      orderBy
    ],
    queryFn: async () =>
      fetchCommunityPools({
        day,
        first,
        month,
        orderDirection,
        skip,
        orderBy
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true
  })
}
