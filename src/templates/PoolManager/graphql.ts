import { gql } from 'graphql-request'

export const GET_POOL_REBALANCE_TIME = gql`
  query ($id: ID!) {
    pool(id: $id) {
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 1) {
        end_timestamp
      }
    }
  }
`
