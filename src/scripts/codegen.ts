import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

export const config: CodegenConfig = {
  schema: process.env.EXPO_PUBLIC_DEV_GQL_ENDPOINT,
  documents: ['src/**/*.tsx'],
  generates: {
    './src/generated/': {
      preset: 'client',
      presetConfig: {
        filename: 'graphql.ts'
      },
      plugins: ['typescript'],
      config: {
        scalars: {
          DateTime: 'Date'
        }
      }
    }
  }
}

export default config
