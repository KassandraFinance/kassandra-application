import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseActivitiesProps = {
  id: string
  skip: number
  take: number
}

export const fetchActivities = async ({
  id,
  skip,
  take
}: UseActivitiesProps) => {
  return kassandraClient.Activities({ id, skip, take }).then(res => res.pool)
}

export const useActivities = ({ id, skip, take }: UseActivitiesProps) => {
  return useQuery({
    queryKey: ['activities', id, skip, take],
    queryFn: async () => fetchActivities({ id, skip, take }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    keepPreviousData: true
  })
}
