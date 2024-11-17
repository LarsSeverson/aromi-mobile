import { useContext } from 'react'
import { AuthGuardContext, AuthGuardContextProps } from '../contexts/AuthGuardContext'

export const useAuthGuardContext = (): AuthGuardContextProps => {
  const context = useContext(AuthGuardContext)
  if (!context) {
    throw new Error('useAuthGuardContext must be used within a AuthGuardProvider')
  }
  return context
}
