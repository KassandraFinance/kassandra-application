import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseManagerTVMChartProps = {
  manager: string
  timestamp: number
}

export const fetchManagerTVMChart = async ({
  manager,
  timestamp
}: UseManagerTVMChartProps) => {
  return kassandraClient
    .ManagerTVMChart({ manager, timestamp })
    .then(res => res.manager)
}

export const useManagerTVMChart = ({
  manager,
  timestamp
}: UseManagerTVMChartProps) => {
  return useQuery({
    queryKey: ['manager-tvm-chart', manager, timestamp],
    queryFn: async () =>
      fetchManagerTVMChart({
        manager,
        timestamp
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true
  })
}
