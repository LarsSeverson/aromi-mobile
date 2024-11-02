import React, { createContext, ReactNode, useMemo } from 'react'
import useAromiAuth from '@/src/hooks/useAromiAuth'

export type AromiAuthContextProps = ReturnType<typeof useAromiAuth>

export const AromiAuthContext = createContext<AromiAuthContextProps | null>(null)

export const AromiAuthProvider = ({ children }: { children: ReactNode }) => {
  const aromiAuth = useAromiAuth()
  const meoizedAuth = useMemo(() => aromiAuth, [aromiAuth])
  return (
    <AromiAuthContext.Provider value={meoizedAuth}>
      {children}
    </AromiAuthContext.Provider>
  )
}
