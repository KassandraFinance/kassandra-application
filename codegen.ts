import type { CodegenConfig } from '@graphql-codegen/cli'
import { SUBGRAPH_URL } from './src/constants/tokenAddresses'

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  hooks: { afterAllFileWrite: ['eslint --fix'] },
  generates: {
    './src/gql/generated/kassandraApi.ts': {
      schema: SUBGRAPH_URL,
      documents: ['./src/gql/queries/kassandra/**/*-kassandra.gql'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request'
      ],
      config: {
        enumsAsTypes: true,
        scalars: {
          BigDecimal: 'string',
          BigInt: 'string',
          Bytes: 'string'
        }
      }
    },
    './src/gql/generated/backendApi.ts': {
      schema: 'https://backend.kassandra.finance/',
      documents: ['./src/gql/queries/backend/**/*-backend.gql'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request'
      ],
      config: {
        enumsAsTypes: true,
        scalars: {
          BigDecimal: 'string',
          BigInt: 'string',
          Bytes: 'string'
        }
      }
    }
  }
}

export default config
