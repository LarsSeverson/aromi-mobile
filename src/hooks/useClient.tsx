import { fetchAuthSession } from 'aws-amplify/auth'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCache, NormalizedCacheObject } from '@apollo/client/core'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface UseClientReturn {
  client: ApolloClient<NormalizedCacheObject>

  refresh: () => void
  reset: () => void
}

export const useClient = (): UseClientReturn => {
  const [token, setToken] = useState<string | null>(null)
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null)

  const authLink = useMemo(() => setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  }), [token])

  const client = useMemo(() => new ApolloClient({
    link: authLink.concat(new HttpLink({ uri: 'http://localhost:3000/dev/graphql' })),
    cache: new InMemoryCache()
  }), [authLink])

  const getToken = useCallback(async () => {
    try {
      const session = await fetchAuthSession()
      const token = session.tokens?.accessToken.toString() || null
      const expiration = session.tokens?.accessToken.payload.exp || null

      setToken(token)
      setTokenExpiration(expiration)
    } catch (error) {
      console.log(error)

      setToken(null)
      setTokenExpiration(null)
    }
  }, [])

  const refresh = useCallback(getToken, [getToken])

  const reset = useCallback(() => {
    setToken(null)
    setTokenExpiration(null)
  }, [])

  useEffect(() => {
    if (!tokenExpiration) return

    const now = Math.floor(Date.now() / 1000)
    const delay = (tokenExpiration - now) * 1000
    const timer = setTimeout(getToken, delay)

    return () => clearTimeout(timer)
  }, [tokenExpiration, getToken])

  useEffect(() => {
    getToken()
  }, [getToken])

  return {
    client,
    refresh,
    reset
  }
}
