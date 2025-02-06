import useAuth from '@/src/hooks/useAuth'
import React from 'react'
import { AuthContext } from '../AuthContext'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = (props: AuthProviderProps) => {
  const { children } = props
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
