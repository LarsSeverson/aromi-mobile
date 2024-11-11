import { useContext } from 'react'
import { HomeContext, HomeContextProps } from '../contexts/HomeContext'

export const useHomeContext = (): HomeContextProps => {
  const context = useContext(HomeContext)
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeProvider')
  }
  return context
}
