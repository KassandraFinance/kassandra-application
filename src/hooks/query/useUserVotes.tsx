import { useQuery } from '@tanstack/react-query'

import { subgraphClient } from '@/graphQLClients'

type UseUserVotesProps = {
  id: string
}

export const fetchUserVotes = async ({ id }: UseUserVotesProps) => {
  return subgraphClient
    .UserVotes({
      id
    })
    .then(res => res.user)
}

export const useUserVotes = ({ id }: UseUserVotesProps) => {
  return useQuery({
    queryKey: ['user-votes', id],
    queryFn: async () => fetchUserVotes({ id })
  })
}
