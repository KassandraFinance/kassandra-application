import { gql } from 'graphql-request'

export const GET_POOL_REBALANCE_TIME = gql`
  query ($id: ID!) {
    pool(id: $id) {
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 1) {
        end_timestamp
      }
    }
  }
`

export const GET_POOL_PRICE = gql`
  query (
    $id: ID!
    $day: Int!
    $week: Int!
    $month: Int!
    $quarterly: Int!
    $year: Int!
  ) {
    pool(id: $id) {
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
      week: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $week }
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
      quarterly: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $quarterly }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      year: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $year }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
    }
  }
`
