import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseProposalsProps = {
  skip: number
  take: number
}

export const fetchProposals = async ({ skip, take }: UseProposalsProps) => {
  return kassandraClient
    .Proposals({
      skip,
      take
    })
    .then(res => res.proposals)
}

export const useProposals = ({ skip, take }: UseProposalsProps) => {
  return useQuery({
    queryKey: ['proposals', skip, take],
    queryFn: async () => fetchProposals({ skip, take }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true
  })
}
