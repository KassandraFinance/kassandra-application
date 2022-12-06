import { gql } from 'graphql-request'

export const GET_INFO_TOKENS = gql`
  {
    tokens(where: { is_wrap_token: 0 }) {
      id
      name
      logo
      symbol
    }
  }
`
