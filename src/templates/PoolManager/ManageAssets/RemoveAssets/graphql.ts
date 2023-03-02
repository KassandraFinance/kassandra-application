import { gql } from 'graphql-request'

export const GET_POOL_TOKENS = gql`
  query ($id: ID!) {
    pool(id: $id) {
      name
      symbol
      logo
      address
      chainId
      price_usd
      supply
      total_value_locked_usd
      controller
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 1) {
        weights(orderBy: weight_normalized, orderDirection: desc) {
          token {
            id
            name
            logo
            decimals
            symbol
          }
          weight_normalized
        }
      }
    }
  }
`
