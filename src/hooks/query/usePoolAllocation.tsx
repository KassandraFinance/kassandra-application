import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolAllocationType = {
  id: string
  skip: number
}

export const fetchPoolAllocation = async ({
  id,
  skip
}: UsePoolAllocationType) => {
  return kassandraClient.PoolAllocation({ id, skip }).then(res => res.pool)
}

export const usePoolAllocation = ({ id, skip }: UsePoolAllocationType) => {
  return useQuery({
    queryKey: ['pool-allocation', id, skip],
    queryFn: async () => fetchPoolAllocation({ id, skip }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
