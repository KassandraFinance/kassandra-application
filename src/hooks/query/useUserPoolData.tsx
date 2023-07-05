import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseUserPoolDataProps = {
  id: string | string[]
  wallet: string
  day: number
  month: number
}

export const fetchUserPoolData = async ({
  id,
  wallet,
  day,
  month
}: UseUserPoolDataProps) => {
  return kassandraClient
    .userPoolData({ id, wallet, day, month })
    .then(res => res)
}

export const useUserPoolData = ({
  id,
  wallet,
  day,
  month
}: UseUserPoolDataProps) => {
  return useQuery({
    queryKey: ['pool-chart', id, wallet],
    queryFn: async () => fetchUserPoolData({ id, wallet, day, month }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
