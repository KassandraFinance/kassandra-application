import { gql } from 'graphql-request'

export const GET_INFO_POOL = gql`
  query ($id: ID!, $day: Int!) {
    pool(id: $id) {
      # information aHYPE
      decimals
      price_usd
      total_value_locked_usd
      fee_exit
      fee_swap
      # pool token information

      fee_join_manager
      fee_join_broker

      fee_aum_kassandra
      fee_aum

      withdraw: fees(
        where: { period: 3600, timestamp_gt: $day, type: "exit" }
      ) {
        volume_usd
      }
      swap: fees(where: { period: 3600, timestamp_gt: $day, type: "swap" }) {
        volume_usd
      }
      volumes(where: { period: 3600, timestamp_gt: $day }) {
        volume_usd
      }
    }
  }
`
