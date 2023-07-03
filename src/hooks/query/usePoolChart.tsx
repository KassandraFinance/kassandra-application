import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolChartProps = {
  id: string | string[]
  wallet: string
  day: number
  month: number
}

export const fetchPoolChart = async ({
  id,
  wallet,
  day,
  month
}: UsePoolChartProps) => {
  return kassandraClient.PoolChart({ id, wallet, day, month }).then(res => res)
}

export const usePoolChart = ({ id, wallet, day, month }: UsePoolChartProps) => {
  return useQuery({
    queryKey: ['pool-chart', id, wallet],
    queryFn: async () => fetchPoolChart({ id, wallet, day, month }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
