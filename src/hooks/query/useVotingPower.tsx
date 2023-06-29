import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'ethers'

import { subgraphClient } from '@/graphQLClients'

type UseVotingPowerProps = {
  id: string
}

export const fetchVotingPower = async ({ id }: UseVotingPowerProps) => {
  return subgraphClient
    .VotingPower({
      id
    })
    .then(res => res)
}

export const useVotingPower = ({ id }: UseVotingPowerProps) => {
  const userWalletAddress = id.length > 0 ? getAddress(id) : ''
  return useQuery({
    queryKey: ['voting-power', userWalletAddress],
    queryFn: async () => fetchVotingPower({ id: userWalletAddress }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
