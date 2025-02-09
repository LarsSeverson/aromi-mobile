import { fetchAuthSession } from 'aws-amplify/auth'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCache, NormalizedCacheObject } from '@apollo/client/core'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface UseClientReturn {
  client: ApolloClient<NormalizedCacheObject>

  refresh: () => Promise<void>
  reset: () => void
}

export const useClient = (): UseClientReturn => {
  const [token, setToken] = useState<string | null>(null)
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null)

  const authLink = useMemo(() =>
    setContext((_, { headers }) => {
      const newHeaders = {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }

      return { headers: newHeaders }
    })
  , [token])

  const client = useMemo(() => new ApolloClient({
    link: authLink.concat(new HttpLink({ uri: 'http://localhost:3000/dev/graphql' })),
    cache: new InMemoryCache({
      typePolicies: {
        Fragrance: {
          fields: {
            notes: {
              merge (existing = {}, incoming) {
                return incoming
              }
            }
          }
        },
        FragranceNotes: {
          keyFields: false,
          fields: {
            top: {
              keyArgs: ['limit', 'offset', 'fill'],
              merge (existing = [], incoming) {
                return [...existing, ...incoming]
              }
            },
            middle: {
              keyArgs: ['limit', 'offset', 'fill'],
              merge (existing = [], incoming) {
                return [...existing, ...incoming]
              }
            },
            base: {
              keyArgs: ['limit', 'offset', 'fill'],
              merge (existing = [], incoming) {
                return [...existing, ...incoming]
              }
            }
          }
        }
      }
    })
  }), [authLink])

  const getToken = useCallback(async () => {
    try {
      const session = await fetchAuthSession({ forceRefresh: true })
      const token = session.tokens?.accessToken.toString() || null
      const expiration = session.tokens?.accessToken.payload.exp || null

      console.log(token)

      setToken(token)
      setTokenExpiration(expiration)
    } catch (error) {
      setToken(null)
      setTokenExpiration(null)
    }
  }, [])

  const refresh = useCallback(async () => await getToken(), [getToken])

  const reset = useCallback(() => {
    setToken(null)
    setTokenExpiration(null)
  }, [])

  useEffect(() => {
    if (!tokenExpiration) return

    const now = Math.floor(Date.now() / 1000)
    const delay = (tokenExpiration - now - 60) * 1000
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
