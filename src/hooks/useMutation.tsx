import { useState, useCallback, useMemo } from 'react'
import { GraphQLResult } from 'aws-amplify/api'
import { DocumentType, GraphQLAuthMode } from '@aws-amplify/core/internals/utils'
import client from './useClient'

export interface UseMutationProps {
  mutation: string

  authMode: GraphQLAuthMode
}

export interface UseMutationReturn<T, V> {
  data: T | null

  loading: boolean

  error: Error | null

  execute: (variables?: V) => Promise<T | null>
  reset: () => void
}

const useMutation = <T, V>(props: UseMutationProps): UseMutationReturn<T, V> => {
  const { mutation, authMode } = useMemo(() => props, [props])

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async (variables?: V): Promise<T | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await client.graphql<V | any>({
        query: mutation,
        variables,
        authMode
      }) as GraphQLResult<T>

      const data = response.data

      setData(data)
      setError(null)

      return data
    } catch (err) {
      const error = err as Error

      setError(error)
      setData(null)

      return null
    } finally {
      setLoading(false)
    }
  }, [authMode, mutation])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, execute, reset }
}

export default useMutation
