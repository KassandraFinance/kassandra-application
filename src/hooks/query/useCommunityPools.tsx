import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'
import { OrderDirection, Pool_OrderBy } from '@/gql/generated/kassandraApi'

type UseCommunityPoolsProps = {
  first: number
  orderDirection: OrderDirection
  skip: number
  orderBy: Pool_OrderBy
  chainIn: string[]
  enabled: boolean
}

export const fetchCommunityPools = async ({
  first,
  orderDirection,
  skip,
  orderBy,
  chainIn
}: Omit<UseCommunityPoolsProps, 'enabled'>) => {
  return kassandraClient
    .CommunityPools({
      first,
      orderDirection,
      skip,
      orderBy,
      chainInId: chainIn,
      chainInString: chainIn
    })
    .then(res => res)
}

export const useCommunityPools = ({
  first,
  orderDirection,
  skip,
  orderBy,
  chainIn,
  enabled
}: UseCommunityPoolsProps) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      'community-pools',
      first,
      orderDirection,
      skip,
      orderBy,
      chainIn,
      enabled
    ],
    queryFn: async () =>
      fetchCommunityPools({
        first,
        orderDirection,
        skip,
        orderBy,
        chainIn
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true,
    enabled
  })
}
