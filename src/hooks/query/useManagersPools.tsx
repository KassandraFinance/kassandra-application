import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'
import { OrderDirection } from '@/gql/generated/kassandraApi'

type UseManagersPoolsProps = {
  day: number
  first: number
  month: number
  orderDirection: OrderDirection
  skip: number
}

export const fetchManagersPools = async ({
  day,
  first,
  month,
  orderDirection,
  skip
}: UseManagersPoolsProps) => {
  return kassandraClient
    .ManagersPools({ day, first, month, orderDirection, skip })
    .then(res => res)
}

export const useManagersPools = ({
  day,
  first,
  month,
  orderDirection,
  skip
}: UseManagersPoolsProps) => {
  return useQuery({
    queryKey: ['managers-pools', day, first, month, orderDirection, skip],
    queryFn: async () =>
      fetchManagersPools({
        day,
        first,
        month,
        orderDirection,
        skip
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
