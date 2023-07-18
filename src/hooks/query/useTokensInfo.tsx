import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseTokensInfoProps = {
  id: string
  whitelist: string | string[]
}

export const fetchTokensInfo = async ({
  id,
  whitelist
}: UseTokensInfoProps) => {
  return kassandraClient.TokensInfo({ id, whitelist }).then(res => res)
}

export const useTokensInfo = ({ id, whitelist }: UseTokensInfoProps) => {
  return useQuery({
    queryKey: ['tokens-info', id, whitelist],
    queryFn: async () => fetchTokensInfo({ id, whitelist }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
