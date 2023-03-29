import { gql } from 'graphql-request'

export const GET_BROKERS_FEES = gql`
  query (
    $id: ID!
    $poolId: ID!
    $depositsTimestamp: Int
    $rewardsTimestamp: Int
  ) {
    manager(id: $id) {
      pools(where: { id: $poolId }) {
        num_deposits_broker
        unique_investors_broker
        brokeredDeposits: volumes(
          where: {
            period: 86400
            type: "join"
            swap_pair_in: ["broker"]
            timestamp_gt: $depositsTimestamp
          }
        ) {
          volume_usd
          timestamp
        }
        brokersRewards: fees(
          where: {
            period: 86400
            type: "join"
            timestamp_gt: $rewardsTimestamp
          }
        ) {
          volume_broker_usd
          timestamp
        }
      }
    }
  }
`
