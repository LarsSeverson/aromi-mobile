import { useState, useEffect, useCallback } from 'react'
import { DocumentNode } from 'graphql'

interface UseQueryProps {
  query: string | DocumentNode,
  variables?: object
}

const useQuery = <T>(props: UseQueryProps) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const response = { data: null }

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
