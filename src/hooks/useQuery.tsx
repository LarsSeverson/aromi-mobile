import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { generateClient, GraphQLResult } from 'aws-amplify/api'
import { GraphQLAuthMode } from '@aws-amplify/core/internals/utils'

const client = generateClient()

interface UseQueryProps {
  query: string
  variables?: Record<string, any>
  authMode: GraphQLAuthMode
}

const useQuery = <T, >(props: UseQueryProps) => {
  const { query, variables, authMode } = props
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const stableVariables = useRef(variables)

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
    !data && getData(stableVariables.current)
  }, [data, getData])

  const refresh = useCallback((variables: Record<string, any> | undefined) => {
    getData(variables)
  }, [getData])

  return { data, loading, error, refresh, getData }
}

export default useQuery
