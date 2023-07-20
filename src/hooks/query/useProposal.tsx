import { useQuery } from '@tanstack/react-query'

import { subgraphClient } from '@/graphQLClients'

type UseProposalProps = {
  number: number
  voter: string
}

export const fetchProposal = async ({ number, voter }: UseProposalProps) => {
  return subgraphClient
    .Proposal({
      number,
      voter
    })
    .then(res => res)
}

export const useProposal = ({ number, voter }: UseProposalProps) => {
  return useQuery({
    queryKey: ['proposal', number, voter],
    queryFn: async () => fetchProposal({ number, voter })
  })
}
