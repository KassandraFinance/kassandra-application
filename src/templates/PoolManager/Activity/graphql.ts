import { gql } from 'graphql-request'

export const GET_ACTIVITIES = gql`
  query ($id: ID!) {
    pool(id: $id) {
      name
      symbol
      logo
      underlying_assets {
        token {
          logo
          symbol
          wraps {
            symbol
            logo
          }
        }
      }
      chain {
        blockExplorerUrl
      }
      activities(
        where: {
          type_in: ["join", "exit"]
          address_not: "0x0000000000000000000000000000000000000000"
        }
        orderBy: timestamp
        orderDirection: desc
        first: 100
      ) {
        type
        timestamp
        price_usd
        txHash
        address
        symbol
        amount
      }
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 100) {
        id
        type
        end_timestamp
        token {
          symbol
          price_usd
          logo
        }
        weights {
          weight_normalized
          asset {
            balance
            token {
              symbol
              logo
            }
          }
        }
      }
    }
  }
`
