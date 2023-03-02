import { gql } from 'graphql-request'

export const GET_INFO_TOKENS = gql`
  query ($whitelist: [ID!]! $id: ID!) {
    tokensByIds(ids: $whitelist) {
      id
      name
      logo
      symbol
      decimals
    }
    pool(id: $id) {
      underlying_assets_addresses
    }
  }
`
