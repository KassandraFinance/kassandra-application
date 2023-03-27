import { gql } from 'graphql-request'

export const GET_TVM_CHART = gql`
  query ($id: ID!, $timestamp: Int!) {
    pool(id: $id) {
      value: total_value_locked(
        where: { base: "usd", timestamp_gt: $timestamp }
        orderBy: timestamp
        orderDirection: asc
        first: 1000
      ) {
        close
        timestamp
      }
    }
  }
`

export const GET_PRICE_CHART = gql`
  query ($id: ID!, $timestamp: Int!) {
    pool(id: $id) {
      value: price_candles(
        where: { base: "usd", timestamp_gt: $timestamp, period: 3600 }
        orderBy: timestamp
        orderDirection: asc
        first: 1000
      ) {
        close
        timestamp
      }
    }
  }
`

export const GET_CHANGE_PRICE = gql`
  query ($id: ID!, $day: Int!, $week: Int!, $month: Int!, $year: Int!) {
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
      year: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $year }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      max: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: 0 }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
    }
  }
`

export const GET_CHANGE_TVL = gql`
  query ($id: ID!, $day: Int!, $week: Int!, $month: Int!, $year: Int!) {
    pool(id: $id) {
      now: total_value_locked(
        where: { base: "usd" }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        timestamp
        close
      }
      day: total_value_locked(
        where: { base: "usd", timestamp_gt: $day }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      week: total_value_locked(
        where: { base: "usd", timestamp_gt: $week }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      month: total_value_locked(
        where: { base: "usd", timestamp_gt: $month }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      year: total_value_locked(
        where: { base: "usd", timestamp_gt: $year }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      max: total_value_locked(
        where: { base: "usd", timestamp_gt: 0 }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
    }
  }
`
