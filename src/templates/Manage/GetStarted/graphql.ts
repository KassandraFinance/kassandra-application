import { gql } from 'graphql-request'

export const GET_PROFILE = gql`
  query ($userVP: ID) {
    user(id: $userVP) {
      votingPower
    }
  }
`
