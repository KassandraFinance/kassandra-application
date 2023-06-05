import { gql } from 'graphql-request'

export const GET_INVESTORS_AMOUNT = gql`
  query ($id: String, $investorsAddresses: [String!]) {
    investors(where: { pool: $id, wallet_in: $investorsAddresses }) {
      wallet
      amount
    }
  }
`
