import { gql } from 'graphql-request'

export const GET_POOLS = gql`
  query {
    pools {
      id
      address
      name
      chain_id
      featured
    }
  }
`
