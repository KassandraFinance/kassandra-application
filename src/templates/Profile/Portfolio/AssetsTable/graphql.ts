import { gql } from 'graphql-request'

export const GET_CHART = gql`
  query ($id: [ID!]!, $day: Int!, $month: Int!, $wallet: String!) {
    pools(where: { id_in: $id, chain_not: "5" }) {
      id
      address
      name
      symbol
      logo
      price_usd # pool asset price
      total_value_locked_usd
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
    }

    managedPools: pools(
      where: { investors_: { wallet: $wallet }, chain_not: "5" }
    ) {
      id
      address
      name
      symbol
      logo
      price_usd # pool asset price
      total_value_locked_usd
      investors(where: { wallet: $wallet }) {
        amount
      }
      chain {
        logo
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
    }
  }
`
