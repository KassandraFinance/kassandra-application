import { gql } from 'graphql-request'

export const GET_POOL = gql`
  query (
    $id: ID!
    $price_period: Int!
    $period_selected: Int!
    $day: Int!
    $month: Int!
  ) {
    pool(id: $id) {
      name
      symbol
      name
      logo
      address
      chainId
      foundedBy
      price_usd # pool asset price
      pool_version
      # price candlestick
      # just taking the close value can make a line graph
      # base can be usd or btc
      # period is in seconds, 5m, 15m, 1h, 4h, 1d, 7d
      # timestamp_gt it's since when to catch
      chain {
        logo
      }
      price_candles(
        where: {
          base: "usd"
          period: $price_period
          timestamp_gt: $period_selected
        }
        orderBy: timestamp
        first: 365
      ) {
        timestamp
        close
      }
      # hourly TVL chart
      total_value_locked(
        where: { base: "usd", timestamp_gt: $period_selected }
        orderBy: timestamp
      ) {
        close
        timestamp
      }
      # hourly allocation chart
      weights(where: { timestamp_gt: $period_selected }, orderBy: timestamp) {
        timestamp
        weights {
          token {
            id
            symbol
          }
          weight_normalized
        }
      }
      total_value_locked_usd
      strategy
      underlying_assets(orderBy: weight_normalized, orderDirection: desc) {
        balance # token balance in pool
        weight_normalized # current allocation in the pool between 0 and 1
        weight_goal_normalized # expected allocation in the pool between 0 and 1
        # token information
        token {
          id
          name
          logo
          decimals
          symbol
          price_usd
          wraps {
            logo
          }
        }
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
        orderBy: timestamp
        first: 1
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
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 2) {
        start_timestamp
        end_timestamp
        weights(orderBy: weight_normalized, orderDirection: desc) {
          weight_normalized
          token {
            id
          }
        }
      }
    }
  }
`
