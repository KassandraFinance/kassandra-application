import { gql } from 'graphql-request'

export const GET_INFO_POOL_MANAGER = gql`
  query ($id: ID!) {
    pool(id: $id) {
      id
      name
      symbol
      price_usd
      logo
      underlying_assets {
        token {
          name
          symbol
          logo
        }
        balance
      }
    }
  }
`
