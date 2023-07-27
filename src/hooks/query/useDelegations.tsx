import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseDelegationsProps = {
  id: string
}

export const fetchDelegations = async ({ id }: UseDelegationsProps) => {
  return kassandraClient.Delegations({ id }).then(res => res)
}

export const useDelegations = ({ id }: UseDelegationsProps) => {
  return useQuery({
    queryKey: ['delegations', id],
    queryFn: async () => fetchDelegations({ id }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
