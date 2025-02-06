import { createContext, useContext } from 'react'
import { UseClientReturn } from '../hooks/useClient'

export const ClientContext = createContext<UseClientReturn | null>(null)

export const useClientContext = (): UseClientReturn => {
  const context = useContext(ClientContext)
  if (!context) {
    throw new Error('useClientContext must be used within a ClientProvider')
  }

  return context
}
