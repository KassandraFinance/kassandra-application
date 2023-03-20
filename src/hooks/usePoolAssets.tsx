import useSWR from 'swr'
import { request } from 'graphql-request'
import { gql } from 'graphql-request'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { underlyingAssetsInfo } from '@/store/reducers/pool'

import { getWeightsNormalizedV2 } from '@/utils/updateAssetsToV2'

export type GetPoolAssetsType = {
  pool: {
    underlying_assets: {
      balance: string,
      weight_goal_normalized: string,
      weight_normalized: string,
      token: {
        decimals: number,
        id: string,
        is_wrap_token: number,
        logo: string,
        name: string,
        price_usd: string,
        symbol: string,
        wraps: {
          id: string,
          decimals: number,
          price_usd: string,
          symbol: string,
          name: string,
          logo: string
        }
      }
    }[],
    weight_goals: {
      end_timestamp: number,
      start_timestamp: number,
      weights: {
        weight_normalized: string,
        asset: {
          token: {
            decimals: number,
            id: string,
            name: string,
            price_usd: string,
            symbol: string
          }
        }
      }[]
    }[]
  }
}

function usePoolAssets(poolId: string) {
  const GET_POOL_ASSETS = gql`
    query ($id: ID!) {
      pool(id: $id) {
        underlying_assets(orderBy: weight_normalized, orderDirection: desc) {
          balance
          weight_normalized
          weight_goal_normalized
          token {
            id
            name
            logo
            symbol
            decimals
            price_usd
            is_wrap_token
            wraps {
              id
              decimals
              price_usd
              symbol
              name
              logo
            }
          }
        }
        weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 2) {
          start_timestamp
          end_timestamp
          weights(orderBy: weight_normalized, orderDirection: desc) {
            asset {
              token {
                id
                name
                symbol
                decimals
                price_usd
              }
            }
            weight_normalized
          }
        }
      }
    }
  `

  const { data, error, isValidating } = useSWR<GetPoolAssetsType>(
    poolId ? [GET_POOL_ASSETS, poolId] : null,
    (query, poolId) =>
      request(BACKEND_KASSANDRA, query, {
        id: poolId
      })
  )

  let underlying_assets: underlyingAssetsInfo[] | undefined
  if (data?.pool) {
    underlying_assets = getWeightsNormalizedV2(
      data.pool.weight_goals,
      data.pool.underlying_assets
    )
  }

  return {
    poolAssets: underlying_assets,
    isValidating,
    isError: error
  }
}

export default usePoolAssets
