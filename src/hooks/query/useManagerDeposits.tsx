import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseManagerDepositsProps = {
  manager: string
  timestamp: number
}

export const fetchManagerDeposits = async ({
  manager,
  timestamp
}: UseManagerDepositsProps) => {
  return kassandraClient
    .ManagerDeposits({ manager, timestamp })
    .then(res => res.manager)
}

export const useManagerDeposits = ({
  manager,
  timestamp
}: UseManagerDepositsProps) => {
  return useQuery({
    queryKey: ['manager-deposits', manager, timestamp],
    queryFn: async () =>
      fetchManagerDeposits({
        manager,
        timestamp
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
