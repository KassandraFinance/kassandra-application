import { gql } from 'graphql-request'

export const GET_ASSETS = gql`
  query ($id: ID!) {
    pool(id: $id) {
      underlying_assets {
        token {
          id
          name
          symbol
          logo
        }
      }
    }
  }
`
