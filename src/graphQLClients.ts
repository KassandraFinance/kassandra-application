import { GraphQLClient } from 'graphql-request'
import { BACKEND_KASSANDRA, SUBGRAPH_URL } from '@/constants/tokenAddresses'
import { getSdk as getSdkKassandra } from '@/gql/generated/kassandraApi'
import { getSdk as getSdkBackend } from '@/gql/generated/backendApi'

// Creates request for Kassandra backend
export const backendApi = new GraphQLClient(BACKEND_KASSANDRA)
export const backendClient = getSdkBackend(backendApi)

// Creates resquest for Kassandra subgraph
export const kassandraApi = new GraphQLClient(SUBGRAPH_URL)
export const kassandraClient = getSdkKassandra(kassandraApi)
