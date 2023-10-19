import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'
import { getWeightsNormalizedV2 } from '@/utils/updateAssetsToV2'

type UsePoolDataProps = {
  id: string
}

export type IPoolDataProps =
  | {
      id: string
      address: string
      price_usd: string
      decimals: number
      total_value_locked_usd: string
      vault: string
      vault_id: string
      controller: string
      chain_id: number
      logo?: string | null
      pool_version: number
      strategy: string
      is_private_pool: boolean
      supply: string
      name: string
      founded_by?: string | null
      symbol: string
      pool_id?: number | null
      url?: string | null
      summary?: string | null
      short_summary?: string | null
      underlying_assets_addresses: Array<string>
      manager: {
        id: string
        nickname?: string | null
        image?: string | null
      }
      chain: {
        id: string
        name: string
        token_name: string
        token_symbol: string
        token_decimals: number
        rpc_urls: Array<string>
        block_explorer_url: string
        seconds_per_block: number
        address_wrapped?: string | null
        logo?: string | null
      }
      underlying_assets: Array<{
        balance: string
        weight_normalized: string
        weight_goal_normalized: string
        token: {
          id: string
          name: string
          logo?: string | null
          symbol: string
          decimals: number
          is_wrap_token: number
          wraps?: {
            id: string
            decimals: number
            symbol: string
            name: string
            logo?: string | null
          } | null
        }
      }>
      weight_goals: Array<{
        start_timestamp: number
        end_timestamp: number
        weights: Array<{
          weight_normalized: string
          asset: {
            __typename?: 'Asset'
            token: { __typename?: 'Token'; id: string }
          }
        }>
      }>
    }
  | null
  | undefined

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
      balance: string
      weight_normalized: string
      weight_goal_normalized: string
      token: {
        __typename?: 'Token' | undefined
        id: string
        name: string
        logo?: string | null | undefined
        symbol: string
        decimals: number
        is_wrap_token: number
        wraps?:
          | {
              __typename?: 'Token' | undefined
              id: string
              decimals: number
              symbol: string
              name: string
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
    enabled: id?.length > 0
  })
}
