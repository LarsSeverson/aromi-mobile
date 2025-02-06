import { createContext, useContext } from 'react'
import { UseAuthReturn } from '@/src/hooks/useAuth'

export const AuthContext = createContext<UseAuthReturn | null>(null)

export const useAuthContext = (): UseAuthReturn => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}
