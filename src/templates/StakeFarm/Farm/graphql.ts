import { gql } from 'graphql-request'

export const GET_INFO_POOL = gql`
  query ($addresses: [ID!]) {
    pools(where: { id_in: $addresses }) {
      price_usd
      address
    }
  }
`
