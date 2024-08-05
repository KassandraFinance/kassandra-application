import { useQuery } from '@tanstack/react-query'

import { kassandraClient } from '@/graphQLClients'
import { getWeightsNormalizedV2 } from '@/utils/updateAssetsToV2'
import { networks } from '@/constants/tokenAddresses'
import { handleInstanceFallbackProvider } from '@/utils/provider'
import { Contract, FallbackProvider } from 'ethers'
import VAULT from '@/constants/abi/VaultBalancer.json'
import ManagedPool from '@/constants/abi/ManagedPool.json'
import Big from 'big.js'
import { LatestBlockResponse, useLatestBlock } from './useLatestBlock'

type UsePoolDataProps = {
  id: string
}

type FetchPoolDataProps = UsePoolDataProps & {
  poolId?: string
  chainId?: string
  latestBlock?: LatestBlockResponse
}

type getVaultProps = {
  id: string
  vaultId: string
  readProvider: FallbackProvider
}

type getVaultReturnProps = {
  tokensAddresses: string[]
  poolAddress: string
}

type getManagedPoolProps = {
  id: string
  readProvider: FallbackProvider
}

function splitChainIdAndPoolId(id: string) {
  const pos = id.indexOf('0x')

  if (pos !== -1) {
    const chainId = id.substring(0, pos)
    const poolId = id.substring(pos)

    return {
      chainId,
      poolId
    }
  }

  return {
    chainId: '',
    poolId: ''
  }
}

export const getManagedPool = async ({
  id,
  readProvider
}: getManagedPoolProps): Promise<string[]> => {
  try {
    const contract = new Contract(id, ManagedPool, readProvider)
    const weight = await contract.getNormalizedWeights()
    const weightFormatted = weight.map((item: bigint) =>
      Big(item.toString()).div(Big(10).pow(18)).toString()
    )

    return weightFormatted
  } catch (error) {
    return []
  }
}

export const getVault = async ({
  id,
  vaultId,
  readProvider
}: getVaultProps): Promise<getVaultReturnProps> => {
  try {
    const contract = new Contract(vaultId, VAULT, readProvider)
    const pooltokens = await contract.getPoolTokens(id)
    const poolAddress = await contract.getPool(id)

    return {
      tokensAddresses: pooltokens[0].map((item: string) => item).slice(1),
      poolAddress: poolAddress[0]
    }
  } catch (error) {
    return {
      tokensAddresses: [],
      poolAddress: ''
    }
  }
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
      fee_join_broker: string
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

export const fetchPoolData = async ({
  id,
  poolId,
  chainId,
  latestBlock
}: FetchPoolDataProps) => {
  let vault: getVaultReturnProps
  let managedPool: string[]

  const thirtyMinutes = 30
  if (
    poolId &&
    chainId &&
    latestBlock &&
    latestBlock.diffInMinutes >= thirtyMinutes
  ) {
    const networkInfo = networks[Number(chainId)]
    const readProvider = handleInstanceFallbackProvider(networkInfo.chainId)

    vault = await getVault({
      id: poolId,
      vaultId: networkInfo.vault,
      readProvider
    })
    managedPool = await getManagedPool({
      id: vault.poolAddress,
      readProvider
    })
  }

  const pool = await kassandraClient.PoolData({ id }).then(res => {
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
      if (vault && vault.tokensAddresses.length > 0 && managedPool.length > 0) {
        const newUnderlying_assets = []
        for (let i = 0; i < vault.tokensAddresses.length; i++) {
          const tokenAddress = vault.tokensAddresses[i]
          const tokenWeight = managedPool[i]
          const tokenInfo = pool.underlying_assets.find(
            asset => asset.token?.wraps?.id ?? asset.token.id === tokenAddress
          )

          if (tokenInfo) {
            newUnderlying_assets.push({
              ...tokenInfo,
              weight_normalized: tokenWeight
            })
          } else {
            newUnderlying_assets.push({
              balance: '',
              weight_normalized: tokenWeight,
              weight_goal_normalized: '',
              token: {
                id: tokenAddress,
                name: '',
                logo: null,
                symbol: '',
                decimals: 18,
                is_wrap_token: 0
              }
            })
          }

          underlying_assets = newUnderlying_assets
          return
        }
      }

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

  return pool
}

export const usePoolData = ({ id }: UsePoolDataProps) => {
  const { chainId, poolId } = splitChainIdAndPoolId(id)
  const { data: latestBlock } = useLatestBlock({ id: chainId })

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['pool-data', id],
    queryFn: async () =>
      fetchPoolData({
        id,
        poolId,
        chainId,
        latestBlock
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: id?.length > 0
  })
}
