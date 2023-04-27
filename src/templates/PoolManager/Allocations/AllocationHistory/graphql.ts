import { gql } from 'graphql-request'

export const GET_ALLOCATION_POOL = gql`
  query ($id: ID!, $skip: Int) {
    pool(id: $id) {
      num_token_add
      num_token_remove
      num_weight_goals
      num_join
      num_exit
      manager {
        id
      }
      weight_goals(
        orderBy: end_timestamp
        orderDirection: desc
        first: 4
        skip: $skip
        where: { previous_not: null }
      ) {
        id
        type
        end_timestamp
        start_timestamp
        txHash
        previous {
          weights {
            weight_normalized
            asset {
              token {
                symbol
              }
            }
          }
        }
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