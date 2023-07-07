import { gql } from 'graphql-request'

export const GET_COMMUNITYPOOLS = gql`
  query (
    $day: Int
    $month: Int
    $orderDirection: OrderDirection
    $first: Int
    $skip: Int
  ) {
    kassandras {
      pool_count
    }
    pools(
      where: {
        manager_not: "0xFF56b00bDaEEf52C3EBb81B0efA6e28497305175"
        id_not: "1370x83db290ae85e02fef7ccf45c1b551e75e7f8cc82000100000000000000000b52"
      }
      orderBy: total_value_locked_usd
      orderDirection: $orderDirection
      first: $first
      skip: $skip
    ) {
      id
      name
      symbol
      logo
      address
      chain {
        logo
      }
      price_usd
      total_value_locked_usd
      is_private_pool
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
