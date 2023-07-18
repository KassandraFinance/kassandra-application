import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolPriceProps = {
  addresses: string[]
}

export const fetchPoolsPriceList = async ({ addresses }: UsePoolPriceProps) => {
  return kassandraClient.PoolsPriceList({ addresses }).then(res => res.pools)
}

export const usePoolsPriceList = ({ addresses }: UsePoolPriceProps) => {
  return useQuery({
    queryKey: ['pools-price-list', addresses],
    queryFn: async () => fetchPoolsPriceList({ addresses }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
