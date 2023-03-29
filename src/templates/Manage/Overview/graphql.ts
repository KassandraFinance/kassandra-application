import { gql } from 'graphql-request'

export const GET_TVM_CHART = gql`
  query ($manager: ID!, $timestamp: Int) {
    manager(id: $manager) {
      total_value_locked(
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

export const GET_CHANGE_TVL = gql`
  query ($manager: ID!, $day: Int!, $week: Int!, $month: Int!, $year: Int!) {
    manager(id: $manager) {
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

export const GET_WITHDRAWS = gql`
  query ($manager: ID!, $timestamp: Int) {
    manager(id: $manager) {
      withdraws: volumes(
        where: { period: 86400, type: "exit", timestamp_gt: $timestamp }
      ) {
        volume_usd
        timestamp
      }
    }
  }
`

export const GET_DEPOSITS = gql`
  query ($manager: ID!, $timestamp: Int) {
    manager(id: $manager) {
      deposits: volumes(
        where: {
          period: 86400
          type: "join"
          swap_pair_in: ["manager", "broker"]
          timestamp_gt: $timestamp
        }
      ) {
        volume_usd
        timestamp
      }
    }
  }
`

export const GET_UNIQUE_INVESTORS = gql`
  query ($manager: ID!) {
    manager(id: $manager) {
      unique_investors
    }
  }
`
