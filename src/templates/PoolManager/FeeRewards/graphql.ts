import { gql } from 'graphql-request'

export const GET_FEES = gql`
  query ($poolId: ID!) {
    pool(id: $poolId) {
      manager {
        id
      }
      price_usd
      symbol
      controller
      fee_join_manager
      fee_join_broker

      total_fees_join_manager_usd
      total_fees_join_broker_usd

      total_fees_aum_usd
      fee_aum
      fee_aum_kassandra

      fees(
        where: { period: 604800, type_in: ["join", "aum"] }
        orderBy: timestamp
        orderDirection: desc
        first: 96
      ) {
        type
        period
        volume_usd
        volume_broker_usd
        timestamp
      }

      lasCollectedAum: fees(
        orderBy: timestamp
        orderDirection: desc
        where: { type: "aum" }
        first: 1
      ) {
        timestamp
      }
    }
  }
`
