import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolInvestorsTableProps = {
  poolId: string
  first: number
  skip: number
}

export const fetchPoolInvestorsTable = async ({
  poolId,
  first,
  skip
}: UsePoolInvestorsTableProps) => {
  return kassandraClient
    .poolInvestorsTable({ poolId, first, skip })
    .then(res => res.pools[0])
}

export const usePoolInvestorsTable = ({
  poolId,
  first,
  skip
}: UsePoolInvestorsTableProps) => {
  return useQuery({
    queryKey: ['pool-info', poolId, first, skip],
    queryFn: async () => fetchPoolInvestorsTable({ poolId, first, skip }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true
  })
}
