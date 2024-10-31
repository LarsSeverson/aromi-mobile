import { useContext } from 'react'
import { AromiAuthContext, AromiAuthContextProps } from '../contexts/AromiAuthContext'

export const useAromiAuthContext = (): AromiAuthContextProps => {
  const context = useContext(AromiAuthContext)
  if (!context) {
    throw new Error('useAromiAuthContext must be used within an AromiAuthProvider')
  }
  return context
}
