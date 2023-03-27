import { gql } from 'graphql-request'

export const GET_JOIN_FESS = gql`
  query ($id: ID!) {
    manager(id: $id) {
      pools {
        fees(where: { type: "join" }) {
          type
          volume_usd
          volume_broker_usd
          timestamp
        }
      }
    }
  }
`
