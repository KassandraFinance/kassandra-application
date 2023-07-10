import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseManagerUniqueInvestorsProps = {
  manager: string
}

export const fetchManagerUniqueInvestors = async ({
  manager
}: UseManagerUniqueInvestorsProps) => {
  return kassandraClient
    .ManagerUniqueInvestors({ manager })
    .then(res => res.manager)
}

export const useManagerUniqueInvestors = ({
  manager
}: UseManagerUniqueInvestorsProps) => {
  return useQuery({
    queryKey: ['manager-unique-investors', manager],
    queryFn: async () =>
      fetchManagerUniqueInvestors({
        manager
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
