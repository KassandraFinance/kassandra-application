import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseTokensProps = {
  tokensList: string[]
}

export const fetchTokens = async ({ tokensList }: UseTokensProps) => {
  return kassandraClient.Tokens({ tokensList }).then(res => res.tokensByIds)
}

export const useTokens = ({ tokensList }: UseTokensProps) => {
  return useQuery({
    queryKey: ['tokens', tokensList],
    queryFn: async () => fetchTokens({ tokensList }),
    enabled: tokensList.length > 0
  })
}
