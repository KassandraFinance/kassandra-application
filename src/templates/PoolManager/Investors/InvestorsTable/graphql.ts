import { gql } from 'graphql-request'

export const GET_INVESTORS = gql`
  query ($manager: ID!, $poolId: ID!, $skip: Int, $first: Int) {
    manager(id: $manager) {
      pools(where: { id: $poolId }) {
        id
        supply
        price_usd
        unique_investors
        investors(
          where: { wallet_not: "0x0000000000000000000000000000000000000000" }
          orderBy: last_deposit_timestamp
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
  }
`
