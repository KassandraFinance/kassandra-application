import { gql } from 'graphql-request'

export const GET_INFO_TOKENS = gql`
  query ($whitelist: [ID!]!) {
    tokensByIds(ids: $whitelist) {
      id
      name
      logo
      symbol
    }
  }
`