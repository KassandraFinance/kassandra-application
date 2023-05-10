import { gql } from 'graphql-request'

export const GET_INFO_POOL = gql`
  query ($id: String!) {
    pools(where: { address: $id }) {
      price_usd
    }
  }
`
