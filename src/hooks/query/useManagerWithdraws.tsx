import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseManagerWithdrawsProps = {
  manager: string
  timestamp: number
}

export const fetchManagerWithdraws = async ({
  manager,
  timestamp
}: UseManagerWithdrawsProps) => {
  return kassandraClient
    .ManagerWithdraws({ manager, timestamp })
    .then(res => res.manager)
}

export const useManagerWithdraws = ({
  manager,
  timestamp
}: UseManagerWithdrawsProps) => {
  return useQuery({
    queryKey: ['manager-withdraws', manager, timestamp],
    queryFn: async () =>
      fetchManagerWithdraws({
        manager,
        timestamp
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
