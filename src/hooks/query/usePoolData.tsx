import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'
import { getWeightsNormalizedV2 } from '@/utils/updateAssetsToV2'

type UsePoolDataProps = {
  id: string
}

export const fetchPoolData = async ({ id }: UsePoolDataProps) => {
  return kassandraClient.PoolData({ id }).then(res => {
    const pool = res.pool

    if (!pool) {
      return pool
    }

    if (pool?.chain_id === 43114) {
      const renameWavax = pool.underlying_assets.find(
        asset => asset.token.symbol === 'WAVAX'
      )
      if (renameWavax) {
        renameWavax.token.symbol = 'AVAX'
        renameWavax.token.name = 'Avalanche'
      }
    }
    let underlying_assets: {
      __typename?: 'Asset' | undefined
      balance: any
      weight_normalized: any
      weight_goal_normalized: any
      token: {
        __typename?: 'Token' | undefined
        id: string
        name?: string | null | undefined
        logo?: string | null | undefined
        symbol?: string | null | undefined
        decimals?: number | null | undefined
        price_usd: any
        is_wrap_token: number
        wraps?:
          | {
              __typename?: 'Token' | undefined
              id: string
              decimals?: number | null | undefined
              price_usd: any
              symbol?: string | null | undefined
              name?: string | null | undefined
              logo?: string | null | undefined
            }
          | null
          | undefined
      }
    }[] = []
    if (pool) {
      underlying_assets = [...pool.underlying_assets].sort((a, b) =>
        a.token.id > b.token.id ? 1 : -1
      )
    }

    if (pool?.pool_version === 2) {
      try {
        const assetsV2 = getWeightsNormalizedV2(
          pool.weight_goals,
          underlying_assets
        )
        if (assetsV2) {
          underlying_assets = assetsV2
        }
      } catch (error) {
        console.log(error)
      }
    }

    const poolWithSortedTokens = { ...pool, underlying_assets }
    return poolWithSortedTokens
  })
}

export const usePoolData = ({ id }: UsePoolDataProps) => {
  return useQuery({
    queryKey: ['pool-data', id],
    queryFn: async () => fetchPoolData({ id }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: id.length > 0
  })
}
