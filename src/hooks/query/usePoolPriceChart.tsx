import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolPriceChartType = {
  id: string
  timestamp: number
}

type UsePoolPriceChartProps = {
  id: string
  timestamp: number
  enabled?: boolean
}

export const fetchPoolPriceChart = async ({
  id,
  timestamp
}: UsePoolPriceChartType) => {
  return kassandraClient.poolPriceChart({ id, timestamp }).then(res => res.pool)
}

export const usePoolPriceChart = ({
  id,
  timestamp,
  enabled = true
}: UsePoolPriceChartProps) => {
  return useQuery({
    queryKey: ['pool-price-chart', id, timestamp],
    queryFn: async () => fetchPoolPriceChart({ id, timestamp }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true,
    enabled: enabled
  })
}
