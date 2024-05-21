import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'

type UsePoolPriceProps = {
  addresses: string[]
}

export const fetchPoolsPriceList = async ({ addresses }: UsePoolPriceProps) => {
  const response = await kassandraClient
    .PoolsPriceList({ addresses })
    .then(res => res.pools)

  const poolsPriceList = response.reduce<Record<string, string>>(
    (acc, item) => {
      acc[item.address] = item.price_usd
      return acc
    },
    {}
  )

  return poolsPriceList
}

export const usePoolsPriceList = ({ addresses }: UsePoolPriceProps) => {
  return useQuery({
    queryKey: ['pools-price-list', addresses],
    queryFn: async () => fetchPoolsPriceList({ addresses }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60
  })
}
