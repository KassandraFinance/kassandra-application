import { useQuery } from '@tanstack/react-query'
import { kassandraClient } from '@/graphQLClients'

type usePoolsWithFeeJoinBroker = {
  month: number
  period_selected: number
  price_period: number
  chainIn: string[]
}

export const fetchPoolsWithFeeJoinBroker = async ({
  month,
  period_selected,
  price_period,
  chainIn
}: usePoolsWithFeeJoinBroker) => {
  return kassandraClient
    .PoolsWithFeeJoinBroker({
      month,
      period_selected,
      price_period,
      chainIn
    })
    .then(res => res)
}

export const usePoolsWithFeeJoinBroker = ({
  month,
  period_selected,
  price_period,
  chainIn
}: usePoolsWithFeeJoinBroker) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['pools-with-join-broker', chainIn],
    queryFn: async () =>
      fetchPoolsWithFeeJoinBroker({
        month,
        period_selected,
        price_period,
        chainIn
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
