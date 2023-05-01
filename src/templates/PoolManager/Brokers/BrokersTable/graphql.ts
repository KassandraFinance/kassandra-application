import { gql } from 'graphql-request'

export const GET_BROKERS = gql`
  query ($id: ID!, $poolId: ID!, $first: Int, $skip: Int) {
    manager(id: $id) {
      pools(where: { id: $poolId }) {
        num_brokers
        brokers(first: $first, skip: $skip) {
          wallet
          num_deposits
          unique_investors
          deposits_usd
          fees_usd
        }
      }
    }
  }
`
