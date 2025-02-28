import type { CodegenConfig } from '@graphql-codegen/cli'

export const config: CodegenConfig = {
  schema: 'http://localhost:3000/dev/graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}

export default config
