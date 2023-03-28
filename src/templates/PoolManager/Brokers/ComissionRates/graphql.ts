import { gql } from 'graphql-request'

export const GET_DEPOSIT_FEE = gql`
  query ($id: ID!, $poolId: ID!) {
    manager(id: $id) {
      pools(where: { id: $poolId }) {
        fee_join_broker
        fee_join_manager
      }
    }
  }
`
