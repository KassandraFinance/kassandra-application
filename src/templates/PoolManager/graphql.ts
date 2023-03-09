import { gql } from 'graphql-request'

export const GET_INFO_POOL = gql`
  query ($id: ID!) {
    pool(id: $id) {
      id
      address
      vault
      chain_id
      chainId
      logo
      pool_version
      strategy
      price_usd
      controller
      chain {
        id
        logo
        chainName
        nativeTokenName
        nativeTokenSymbol
        nativeTokenDecimals
        rpcUrls
        blockExplorerUrl
        secondsPerBlock
        addressWrapped
      }
      name
      foundedBy
      symbol
      poolId
      url
      summary
      partners {
        logo
        url
      }
      total_value_locked_usd
      underlying_assets_addresses
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
          token {
            id
          }
          weight_normalized
        }
      }
    }
  }
`
