import { useInfiniteQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseManagerPoolActivitiesType = {
  id: string
  options: string | string[]
  first: number
  skip: number
}

type UseManagerPoolActivitiesProps = {
  id: string
  options: string | string[]
  first: number
}

export const fetchManagerPoolActivities = async ({
  id,
  options,
  first,
  skip
}: UseManagerPoolActivitiesType) => {
  return kassandraClient
    .ManagerPoolActivities({ id, options, first, skip })
    .then(res => res.pool)
}

export const useManagerPoolActivities = ({
  id,
  options,
  first
}: UseManagerPoolActivitiesProps) => {
  return useInfiniteQuery({
    queryKey: ['manager-pool-activities', id, options],
    queryFn: async ({ pageParam = 0 }) =>
      fetchManagerPoolActivities({ id, options, first, skip: pageParam }),
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length * 10 || null
    },
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
