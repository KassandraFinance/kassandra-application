import { gql } from 'graphql-request'

export const GET_PROFILE = gql`
  query {
    pools {
      id
      address
      symbol
      price_usd
    }
  }
`
