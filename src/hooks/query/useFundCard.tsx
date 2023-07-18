import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseFundCardProps = {
  id: string
  day: number
  month: number
  period_selected: number
  price_period: number
}

export const fetchFundCard = async ({
  id,
  day,
  month,
  period_selected,
  price_period
}: UseFundCardProps) => {
  return kassandraClient
    .FundCard({ id, day, month, period_selected, price_period })
    .then(res => res.pool)
}

export const useFundCard = ({
  id,
  day,
  month,
  period_selected,
  price_period
}: UseFundCardProps) => {
  return useQuery({
    queryKey: ['fund-card', id],
    queryFn: async () =>
      fetchFundCard({
        id,
        day,
        month,
        period_selected,
        price_period
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
