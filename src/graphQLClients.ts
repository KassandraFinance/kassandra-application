import { GraphQLClient } from 'graphql-request'
import { BACKEND_KASSANDRA, SUBGRAPH_URL } from '@/constants/tokenAddresses'
import { getSdk as getSdkKassandra } from '@/gql/generated/kassandraApi'
import { getSdk as getSdkSubgraph } from '@/gql/generated/subgraphApi'

// Creates resquest for Kassandra backend
export const kassandraApi = new GraphQLClient(BACKEND_KASSANDRA)
export const kassandraClient = getSdkKassandra(kassandraApi)

// Creates request for subgraph api
export const subgraphApi = new GraphQLClient(SUBGRAPH_URL)
export const subgraphClient = getSdkSubgraph(subgraphApi)
