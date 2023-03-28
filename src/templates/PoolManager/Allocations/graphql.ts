import { gql } from 'graphql-request'

export const GET_TOKENS_POOL = gql`
  query ($id: ID!) {
    pool(id: $id) {
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 2) {
        start_timestamp
        end_timestamp
        weights(orderBy: weight_normalized, orderDirection: desc) {
          weight_normalized
          token {
            id
          }
        }
      }
    }
  }
`
