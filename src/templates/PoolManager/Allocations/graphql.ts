import { gql } from 'graphql-request'

export const GET_TOKENS_POOL = gql`
  query ($id: ID!) {
    pool(id: $id) {
      name
      symbol
      logo
      price_usd
      chainId
      activities(
        where: {
          type_in: ["join", "exit"]
          address_not: "0x0000000000000000000000000000000000000000"
        }
        orderBy: timestamp
        orderDirection: desc
        first: 100
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
      chain {
        blockExplorerUrl
        addressWrapped
      }
      weight_goals(orderBy: end_timestamp, orderDirection: desc) {
        id
        type
        end_timestamp
        start_timestamp
        token {
          symbol
          logo
          price_usd
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
