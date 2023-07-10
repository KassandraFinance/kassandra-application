import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseManagerChangeTVLProps = {
  manager: string
  day: number
  week: number
  month: number
  year: number
}

export const fetchManagerChangeTVL = async ({
  manager,
  day,
  week,
  month,
  year
}: UseManagerChangeTVLProps) => {
  return kassandraClient
    .ManagerChangeTVL({ manager, day, week, month, year })
    .then(res => res.manager)
}

export const useManagerChangeTVL = ({
  manager,
  day,
  week,
  month,
  year
}: UseManagerChangeTVLProps) => {
  return useQuery({
    queryKey: ['manager-change-tvl', manager],
    queryFn: async () =>
      fetchManagerChangeTVL({
        manager,
        day,
        week,
        month,
        year
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
