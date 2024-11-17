import React, { createContext, ReactNode, useMemo } from 'react'
import useAromiAuth from '@/src/hooks/useAromiAuth'

export type AromiAuthContextProps = ReturnType<typeof useAromiAuth>

export const AromiAuthContext = createContext<AromiAuthContextProps | null>(null)

interface AromiAuthProviderProps {
  children: ReactNode
}

export const AromiAuthProvider: React.FC<AromiAuthProviderProps> = (props: AromiAuthProviderProps) => {
  const { children } = props
  const aromiAuth = useAromiAuth()
  const memoizedAuth = useMemo(() => aromiAuth, [aromiAuth])

  return (
    <AromiAuthContext.Provider value={memoizedAuth}>
      {children}
    </AromiAuthContext.Provider>
  )
}
