import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolChartsProps = {
  id: string
  period_selected: number
  price_period: number
}

export const fetchPoolCharts = async ({
  id,
  period_selected,
  price_period
}: UsePoolChartsProps) => {
  return kassandraClient
    .PoolCharts({ id, period_selected, price_period })
    .then(res => res.pool)
}

export const usePoolCharts = ({
  id,
  period_selected,
  price_period
}: UsePoolChartsProps) => {
  return useQuery({
    queryKey: ['pool-charts', id, period_selected, price_period],
    queryFn: async () => fetchPoolCharts({ id, period_selected, price_period }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true
  })
}
