import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'ethers'

import { kassandraClient } from '@/graphQLClients'

type UseManagerJoinFeesType = {
  poolId: string
  id: string
}

type UseManagerJoinFeesProps = {
  poolId: string
  id: string | undefined
}

export const fetchManagerJoinFees = async ({
  poolId,
  id
}: UseManagerJoinFeesType) => {
  return kassandraClient
    .ManagerJoinFees({ poolId, id })
    .then(res => res.manager)
}

export const useManagerJoinFees = ({ poolId, id }: UseManagerJoinFeesProps) => {
  const user = id ? getAddress(id) : ''
  return useQuery({
    queryKey: ['manager-join-fees', poolId, user],
    queryFn: async () =>
      fetchManagerJoinFees({
        poolId,
        id: user
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: user.length > 0
  })
}
