import { gql } from 'graphql-request'

export const GET_TOKENS_POOL = gql`
  query ($id: ID!) {
    pool(id: $id) {
      id
      name
      price_usd
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 2) {
        id
        start_timestamp
        end_timestamp
        type
        weights {
          id
          weight_normalized
          asset {
            balance

            token {
              id
              symbol
            }
          }
        }
      }
    }
  }
`
