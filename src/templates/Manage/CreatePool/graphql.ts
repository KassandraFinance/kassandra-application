import { gql } from 'graphql-request'

export const SAVE_POOL = gql`
  mutation (
    $controller: String!
    $chainId: Int!
    $signature: String!
    $logo: String
    $summary: String
  ) {
    savePool(
      controller: $controller
      chainId: $chainId
      signature: $signature
      logo: $logo
      summary: $summary
    ) {
      message
      ok
    }
  }
`
