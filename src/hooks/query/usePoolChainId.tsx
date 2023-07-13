import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolChainIdType = {
  id: string
}

export const fetchPoolChainId = async ({ id }: UsePoolChainIdType) => {
  return kassandraClient.PoolChainId({ id }).then(res => res.pool)
}

export const usePoolChainId = ({ id }: UsePoolChainIdType) => {
  return useQuery({
    queryKey: ['pool-chainId', id],
    queryFn: async () => fetchPoolChainId({ id })
  })
}
