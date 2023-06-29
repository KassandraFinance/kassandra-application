import type { CodegenConfig } from '@graphql-codegen/cli'
import { BACKEND_KASSANDRA, SUBGRAPH_URL } from './src/constants/tokenAddresses'

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  hooks: { afterAllFileWrite: ['eslint --fix'] },
  generates: {
    // './src/gql/generated/kassandraApi.ts': {
    //   schema: BACKEND_KASSANDRA,
    //   documents: ['./src/gql/queries/kassandra/**/*-kassandra.gql'],
    //   plugins: [
    //     'typescript',
    //     'typescript-operations',
    //     'typescript-graphql-request'
    //   ],
    //   config: {
    //     enumsAsTypes: true
    //   }
    // },
    './src/gql/generated/subgraphApi.ts': {
      schema: SUBGRAPH_URL,
      documents: ['./src/gql/queries/subgraph/**/*-subgraph.gql'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request'
      ],
      config: {
        enumsAsTypes: true
      }
    }
  }
}

export default config
