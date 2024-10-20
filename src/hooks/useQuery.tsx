import { useState, useEffect, useCallback } from 'react'
import { generateClient, GraphQLResult } from 'aws-amplify/api'
import { GraphQLAuthMode } from '@aws-amplify/core/internals/utils'

const client = generateClient()

interface UseQueryProps {
  query: string
  variables?: object
  authMode: GraphQLAuthMode
}

const useQuery = <T, >(props: UseQueryProps) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const response = await client.graphql<typeof props.variables>({
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
  }, [props.query, props.variables, trigger])

  const refresh = useCallback(() => {
    setTrigger(prev => prev + 1)
  }, [])

  return { data, loading, error, refresh }
}

export default useQuery
