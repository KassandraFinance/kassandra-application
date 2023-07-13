import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'ethers'

import { kassandraClient } from '@/graphQLClients'

type UseManagerPoolInfoType = {
  id: string
  manager: string
}

type UseManagerPoolInfoProps = {
  id: string
  manager: string | undefined
}

export const fetchManagerPoolInfo = async ({
  id,
  manager
}: UseManagerPoolInfoType) => {
  return kassandraClient.ManagerPoolInfo({ id, manager }).then(res => res.pools)
}

export const useManagerPoolInfo = ({
  id,
  manager
}: UseManagerPoolInfoProps) => {
  const user = manager ? getAddress(manager) : ''
  return useQuery({
    queryKey: ['manager-pool-info', id, user],
    queryFn: async () =>
      fetchManagerPoolInfo({
        id,
        manager: user
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
