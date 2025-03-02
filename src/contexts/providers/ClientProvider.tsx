import { useClient } from '@/src/hooks/useClient'
import React from 'react'
import { ClientContext } from '../ClientContext'
import { ApolloProvider } from '@apollo/client'

interface ClientProviderProps {
  children: React.ReactNode
}

export const ClientProvider = (props: ClientProviderProps) => {
  const { children } = props
  const { client, refresh, reset } = useClient()

  return (
    <ClientContext.Provider value={{ client, refresh, reset }}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ClientContext.Provider>
  )
}
