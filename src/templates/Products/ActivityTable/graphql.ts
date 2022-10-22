import { gql } from 'graphql-request'

export const GET_ACTIVITY = gql`
  query ($skip: Int!, $take: Int!, $id: ID!) {
    pool(id: $id) {
      activities(
        orderBy: timestamp
        orderDirection: desc
        skip: $skip
        first: $take
      ) {
        id
        address
        type
        txHash
        timestamp
        symbol
        amount
        price_usd
      }
    }
  }
`
