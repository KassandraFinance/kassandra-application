import { gql } from 'graphql-request'

export const GET_MANAGERS_POOLS = gql`
  query (
    $day: Int
    $month: Int
    $orderDirection: OrderDirection
    $skip: Int
    $first: Int
  ) {
    totalManagers: managers {
      id
    }
    managers(
      orderBy: total_value_locked_usd
      orderDirection: $orderDirection
      skip: $skip
      first: $first
    ) {
      id
      pool_count
      unique_investors
      total_value_locked_usd
      TVLDay: total_value_locked(
        where: { base: "usd", timestamp_gt: $day }
        first: 1
      ) {
        timestamp
        close
      }
      TVLMonthly: total_value_locked(
        where: { base: "usd", timestamp_gt: $month }
        first: 1
      ) {
        timestamp
        close
      }
    }
  }
`

export const GET_USERS_VOTEWEIGHTS = gql`
  query ($id_in: [ID!]) {
    users(where: { id_in: $id_in }) {
      id
      votingPower
    }
    governances {
      totalVotingPower
    }
  }
`
