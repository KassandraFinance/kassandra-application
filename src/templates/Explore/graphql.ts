import { gql } from 'graphql-request'

export const GET_COMMUNITYPOOLS = gql`
  query ($day: Int, $month: Int, $multisig: String) {
    pools(where: { manager_not: $multisig }) {
      id
      name
      symbol
      logo
      address
      chainId
      chain {
        logo
      }
      price_usd
      total_value_locked_usd
      volumes(
        where: { period: 86400 }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        volume_usd
      }
      now: price_candles(
        where: { base: "usd", period: 3600 }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        timestamp
        close
      }
      day: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $day }
      ) {
        timestamp
        close
      }
      month: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $month }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 1) {
        weights(orderBy: weight_normalized, orderDirection: desc) {
          token {
            logo
          }
        }
      }
    }
  }
`
