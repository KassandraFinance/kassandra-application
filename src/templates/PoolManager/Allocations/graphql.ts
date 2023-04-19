import { gql } from 'graphql-request'

export const GET_TOKENS_POOL = gql`
  query ($id: ID!) {
    pool(id: $id) {
      name
      symbol
      logo
      price_usd
      chain_id
      num_token_add
      num_token_remove
      num_weight_goals
      chain {
        blockExplorerUrl
        addressWrapped
      }
      weight_goals(orderBy: end_timestamp, orderDirection: desc) {
        id
        type
        end_timestamp
        start_timestamp
        token {
          symbol
          logo
          price_usd
        }
        weights {
          weight_normalized
          asset {
            balance
            token {
              symbol
              logo
            }
          }
        }
      }
    }
  }
`
