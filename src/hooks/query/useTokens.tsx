import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseTokensProps = {
  chainId: number
}

export const fetchTokens = async ({ chainId }: UseTokensProps) => {
  return kassandraClient.Tokens({ chainId }).then(res => res.tokensByIds)
}

export const useTokens = ({ chainId }: UseTokensProps) => {
  return useQuery({
    queryKey: ['tokens', chainId],
    queryFn: async () => fetchTokens({ chainId })
  })
}
