import { gql } from 'graphql-request'

export const GET_POOL = gql`
  query ($id: ID!) {
    pool(id: $id) {
      price_usd
      decimals
      fee_exit
    }
  }
`
