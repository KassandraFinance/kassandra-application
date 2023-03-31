import { gql } from 'graphql-request'

export const GET_BROKERS = gql`
  query ($id: ID!, $poolId: ID!) {
    manager(id: $id) {
      pools(where: { id: $poolId }) {
        brokers {
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
