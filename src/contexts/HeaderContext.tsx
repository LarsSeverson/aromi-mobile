import { createContext, useContext } from 'react'
import { type UseHeaderReturn } from '../hooks/useHeader'

export const HeaderContext = createContext<UseHeaderReturn | null>(null)

export const useHeaderContext = (): UseHeaderReturn => {
  const context = useContext(HeaderContext)
  if (context == null) {
    throw new Error('useHeaderContext must be used within a HeaderProvider')
  }

  return context
}
