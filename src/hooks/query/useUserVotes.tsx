import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseUserVotesProps = {
  id: string
}

export const fetchUserVotes = async ({ id }: UseUserVotesProps) => {
  return kassandraClient
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
