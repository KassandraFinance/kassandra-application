import { gql } from 'graphql-request'

export const GET_INVESTORS = gql`
  query ($poolId: ID!, $skip: Int, $first: Int) {
    pools(where: { id: $poolId }) {
      id
      supply
      price_usd
      unique_investors
      investors(
        orderBy: amount
        orderDirection: desc
        skip: $skip
        first: $first
      ) {
        id
        wallet
        first_deposit_timestamp
        last_deposit_timestamp
        amount
      }
    }
  }
`
