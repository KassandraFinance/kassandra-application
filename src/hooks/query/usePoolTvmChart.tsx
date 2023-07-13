import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolTvmChartType = {
  id: string
  timestamp: number
}

type UsePoolTvmChartProps = {
  id: string
  timestamp: number
  enabled?: boolean
}

export const fetchPoolTvmChart = async ({
  id,
  timestamp
}: UsePoolTvmChartType) => {
  return kassandraClient.PoolTvmChart({ id, timestamp }).then(res => res.pool)
}

export const usePoolTvmChart = ({
  id,
  timestamp,
  enabled = true
}: UsePoolTvmChartProps) => {
  return useQuery({
    queryKey: ['pool-tvm-chart', id, timestamp],
    queryFn: async () => fetchPoolTvmChart({ id, timestamp }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true,
    enabled: enabled
  })
}
