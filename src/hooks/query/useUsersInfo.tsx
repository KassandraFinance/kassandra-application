import { useQuery } from '@tanstack/react-query'

import { subgraphClient } from '@/graphQLClients'

type UseUsersInfoProps = {
  skip: number
  take: number
}

export const fetchUsersInfo = async ({ skip, take }: UseUsersInfoProps) => {
  return subgraphClient
    .UsersInfo({
      skip,
      take
    })
    .then(res => res)
}

export const useUsersInfo = ({ skip, take }: UseUsersInfoProps) => {
  return useQuery({
    queryKey: ['users-info', skip, take],
    queryFn: async () => fetchUsersInfo({ skip, take }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true
  })
}
