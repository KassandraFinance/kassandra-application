import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'ethers'

import { kassandraClient } from '@/graphQLClients'

type FetchManagerTotalTVL = {
  manager: string
}

export const fetchManagerTotalTVL = async ({
  manager
}: FetchManagerTotalTVL) => {
  return kassandraClient.managerTotalManaged({ manager }).then(res => res)
}

export const useManagerTotalTVL = ({
  manager
}: {
  manager: string | undefined
}) => {
  const id = manager ? getAddress(manager) : ''
  return useQuery({
    queryKey: ['managerTotalManaged', id],
    queryFn: async () =>
      fetchManagerTotalTVL({
        manager: id
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: id.length > 0
  })
}
