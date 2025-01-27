import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { GraphQLResult } from 'aws-amplify/api'
import { GraphQLAuthMode } from '@aws-amplify/core/internals/utils'
import client from './useClient'

// TODO: This is now useResolver. Change all dependencies to use useResolver instead of useQuery

interface UseQueryProps {
  query: string

  variables?: Record<string, any> | undefined

  authMode: GraphQLAuthMode
}

const useQuery = <T, >(props: UseQueryProps) => {
  const { query, variables, authMode } = useMemo(() => props, [props])

  const stableVariables = useRef(variables)

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const getData = useCallback(async (variables: Record<string, any> | undefined): Promise<T | null> => {
    setLoading(true)

    try {
      const response = await client.graphql<typeof variables>({
        query,
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
  }, [authMode, query])

  useEffect(() => {
    !data && stableVariables.current && getData(stableVariables.current)
  }, [data, getData])

  const refresh = useCallback((variables: Record<string, any> | undefined) => {
    getData(variables)
  }, [getData])

  return { data, loading, error, refresh, getData }
}

export default useQuery
