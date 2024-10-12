import { API } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { useState, useEffect, useCallback } from 'react'
import { DocumentNode } from 'graphql'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth'

interface UseQueryProps {
  query: string | DocumentNode,
  variables?: object,
  authMode?: keyof typeof GRAPHQL_AUTH_MODE
}

const useQuery = <T>(props: UseQueryProps) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const response = await API.graphql({
          query: props.query,
          variables: props.variables,
          authMode: props.authMode
        }) as GraphQLResult<T>

        const data = response.data

        if (data) {
          setData(data)
          setError(null)
        } else {
          setError(new Error('Failed to get suggested fragranes'))
        }
      } catch (err) {
        setError(err as Error)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [props.query, props.variables, props.authMode, trigger])

  const refresh = useCallback(() => {
    setTrigger(prev => prev + 1)
  }, [])

  return { data, loading, error, refresh }
}

export default useQuery
