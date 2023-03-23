import { gql } from 'graphql-request'

export const GET_COMMUNITYPOOLS = gql`
  query ($day: Int, $month: Int) {
    pools(
      where: { manager_not: "0xFF56b00bDaEEf52C3EBb81B0efA6e28497305175" }
    ) {
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
          asset {
            token {
              logo
            }
          }
        }
      }
    }
  }
`
