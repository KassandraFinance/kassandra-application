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
  chainIn: string[]
}

export const fetchCommunityPools = async ({
  day,
  first,
  month,
  orderDirection,
  skip,
  orderBy,
  chainIn
}: UseCommunityPoolsProps) => {
  return kassandraClient
    .CommunityPools({
      day,
      first,
      month,
      orderDirection,
      skip,
      orderBy,
      chainInId: chainIn,
      chainInString: chainIn
    })
    .then(res => res)
}

export const useCommunityPools = ({
  day,
  first,
  month,
  orderDirection,
  skip,
  orderBy,
  chainIn
}: UseCommunityPoolsProps) => {
  return useQuery({
    queryKey: [
      'community-pools',
      first,
      orderDirection,
      skip,
      orderBy,
      chainIn
    ],
    queryFn: async () =>
      fetchCommunityPools({
        day,
        first,
        month,
        orderDirection,
        skip,
        orderBy,
        chainIn
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true
  })
}
