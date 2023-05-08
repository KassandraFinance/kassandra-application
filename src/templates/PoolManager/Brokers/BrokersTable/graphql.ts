import { gql } from 'graphql-request'

export const GET_BROKERS = gql`
  query ($poolId: ID!, $first: Int, $skip: Int) {
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
`
