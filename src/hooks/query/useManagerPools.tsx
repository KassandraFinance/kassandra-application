import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'ethers'

import { kassandraClient } from '@/graphQLClients'

type UseManagerPoolsProps = {
  manager: string
}

export const fetchManagerPools = async ({ manager }: UseManagerPoolsProps) => {
  return kassandraClient.ManagerPools({ manager }).then(res => res.pools)
}

export const useManagerPools = ({
  manager
}: {
  manager: string | undefined
}) => {
  const id = manager ? getAddress(manager) : ''
  return useQuery({
    queryKey: ['manager-pools', id],
    queryFn: async () =>
      fetchManagerPools({
        manager: id
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: id.length > 0
  })
}
