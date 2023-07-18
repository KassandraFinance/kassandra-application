import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'
import { OrderDirection } from '@/gql/generated/kassandraApi'

type UseCommunityPoolsProps = {
  day: number
  first: number
  month: number
  orderDirection: OrderDirection
  skip: number
}

export const fetchCommunityPools = async ({
  day,
  first,
  month,
  orderDirection,
  skip
}: UseCommunityPoolsProps) => {
  return kassandraClient
    .CommunityPools({ day, first, month, orderDirection, skip })
    .then(res => res)
}

export const useCommunityPools = ({
  day,
  first,
  month,
  orderDirection,
  skip
}: UseCommunityPoolsProps) => {
  return useQuery({
    queryKey: ['community-pools', day, first, month, orderDirection, skip],
    queryFn: async () =>
      fetchCommunityPools({
        day,
        first,
        month,
        orderDirection,
        skip
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true
  })
}
