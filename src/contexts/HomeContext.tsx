import React, { createContext, ReactNode, useCallback, useMemo } from 'react'
import { AuthActions } from '../components/auth/Utils/AuthActions'

export interface HomeContextProps extends AuthActions {}

export const HomeContext = createContext<HomeContextProps | null>(null)

interface HomeProviderProps {
  children: ReactNode
}

export const HomeProvider: React.FC<HomeProviderProps> = (props: HomeProviderProps) => {
  const { children } = props

  const onUnAuth = useCallback(() => {
    console.log('Test')
  }, [])

  const value = useMemo(() => ({ onUnAuth }), [onUnAuth])

  return (
    <HomeContext.Provider value={value}>
      {children}
    </HomeContext.Provider>
  )
}
