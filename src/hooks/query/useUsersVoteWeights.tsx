import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseUsersVoteWeightsProps = {
  id_in: string | string[]
}

export const fetchUsersVoteWeights = async ({
  id_in
}: UseUsersVoteWeightsProps) => {
  return kassandraClient.UsersVoteWeights({ id_in }).then(res => res)
}

export const useUsersVoteWeights = ({ id_in }: UseUsersVoteWeightsProps) => {
  return useQuery({
    queryKey: ['users-vote-weights', id_in],
    queryFn: async () => fetchUsersVoteWeights({ id_in }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
