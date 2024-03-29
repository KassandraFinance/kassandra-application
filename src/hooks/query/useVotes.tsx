import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseVotesProps = {
  support: boolean
  number: number
}

export const fetchVotes = async ({ support, number }: UseVotesProps) => {
  return kassandraClient
    .Votes({
      support,
      number
    })
    .then(res => res)
}

export const useVotes = ({ support, number }: UseVotesProps) => {
  return useQuery({
    queryKey: ['votes', support, number],
    queryFn: async () => fetchVotes({ support, number }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
