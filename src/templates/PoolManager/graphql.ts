import { gql } from 'graphql-request'

export const GET_POOL = gql`
  query ($id: ID!) {
    pool(id: $id) {
      name
      symbol
      name
      logo
      address
      chainId
      foundedBy
      price_usd # pool asset price
      # price candlestick
      # just taking the close value can make a line graph
      # base can be usd or btc
      # period is in seconds, 5m, 15m, 1h, 4h, 1d, 7d
      # timestamp_gt it's since when to catch
      chain {
        logo
      }
      total_value_locked_usd
      strategy
    }
  }
`
