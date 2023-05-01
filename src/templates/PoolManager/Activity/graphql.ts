import { gql } from 'graphql-request'

export const GET_ACTIVITIES = gql`
  query ($id: ID!, $first: Int!, $skip: Int!, $options: [String!]!) {
    pool(id: $id) {
      name
      symbol
      logo
      manager {
        id
      }
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
          type_in: $options
          address_not: "0x0000000000000000000000000000000000000000"
        }
        orderBy: timestamp
        orderDirection: desc
        skip: $skip
        first: $first
      ) {
        id
        type
        timestamp
        price_usd
        txHash
        address
        symbol
        amount
      }
      weight_goals(
        orderBy: end_timestamp
        orderDirection: desc
        skip: $skip
        first: $first
        where: { previous_not: null, type_in: $options }
      ) {
        id
        type
        txHash
        end_timestamp
        previous {
          weights {
            weight_normalized
            asset {
              token {
                symbol
              }
            }
          }
        }
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
