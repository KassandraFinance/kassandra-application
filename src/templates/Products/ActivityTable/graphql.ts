import { gql } from 'graphql-request'

export const GET_ACTIVITY = gql`
  query ($skip: Int!, $take: Int!, $id: ID!) {
    pool(id: $id) {
      underlying_assets(orderBy: weight_normalized, orderDirection: desc) {
        balance # token balance in pool
        weight_normalized # current allocation in the pool between 0 and 1
        weight_goal_normalized # expected allocation in the pool between 0 and 1
        # token information
        token {
          id
          name
          decimals
          symbol
          price_usd
        }
      }
      num_activities
      activities(
        orderBy: timestamp
        orderDirection: desc
        skip: $skip
        first: $take
      ) {
        id
        address
        type
        txHash
        timestamp
        symbol
        amount
        price_usd
        pool {
          name
          symbol
          price_usd
        }
      }
    }
  }
`
