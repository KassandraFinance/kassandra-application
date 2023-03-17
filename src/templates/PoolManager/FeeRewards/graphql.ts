import { gql } from 'graphql-request'

export const GET_FEES = gql`
  query ($poolId: ID!) {
    pool(id: $poolId) {
      manager
      price_usd
      symbol
      controller
      fee_join_manager
      fee_join_broker
      total_fees_join_manager
      total_fees_join_broker

      total_fees_join_manager_usd
      total_fees_join_broker_usd

      total_fees_aum_usd
      fee_aum
    }
  }
`
