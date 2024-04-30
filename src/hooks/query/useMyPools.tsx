import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UseMyPools = {
  day: number
  month: number
  userWallet?: string
  chainIn: string[]
}

export const fetchMyPools = async ({
  userWallet,
  chainIn,
  day,
  month
}: UseMyPools) => {
  return kassandraClient
    .MyPools({ day, month, chainIn, userWallet })
    .then(res => res.pools)
}

export const useMyPools = ({ userWallet, chainIn, day, month }: UseMyPools) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['my-pools', userWallet, chainIn],
    queryFn: async () =>
      fetchMyPools({
        day,
        month,
        chainIn,
        userWallet
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: !!userWallet
  })
}
