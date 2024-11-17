import React, { createContext, ReactNode, useMemo } from 'react'
import useAuthGuard from '../hooks/useAuthGuard'

export type AuthGuardContextProps = ReturnType<typeof useAuthGuard>

export const AuthGuardContext = createContext<AuthGuardContextProps | null>(null)

interface AuthGuardProviderProps {
  children: ReactNode
}

export const AuthGuardProvider: React.FC<AuthGuardProviderProps> = (props: AuthGuardProviderProps) => {
  const { children } = props
  const authGuard = useAuthGuard()
  const memoizedAuthGuard = useMemo(() => authGuard, [authGuard])

  return (
    <AuthGuardContext.Provider value={memoizedAuthGuard}>
      {children}
    </AuthGuardContext.Provider>
  )
}
