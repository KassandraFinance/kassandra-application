import { gql } from 'graphql-request'

export const GET_JOIN_FESS = gql`
  query ($id: ID!, $poolId: ID!) {
    manager(id: $id) {
      pools(where: { id: $poolId }) {
        fees(where: { type: "join" }) {
          type
          volume_usd
          volume_broker_usd
          timestamp
        }
        volumes(
          where: {
            period: 86400
            type: "join"
            swap_pair_in: ["broker", "manager"]
          }
        ) {
          volume_usd
          swap_pair
          timestamp
        }
      }
    }
  }
`
