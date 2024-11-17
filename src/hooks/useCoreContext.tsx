import { useContext } from 'react'
import { CoreContext, CoreContextProps } from '../contexts/CoreContext'

export const useCoreContext = (): CoreContextProps => {
  const context = useContext(CoreContext)
  if (!context) {
    throw new Error('useCoreContext must be used within a CoreProvider')
  }
  return context
}
