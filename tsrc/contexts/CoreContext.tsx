import React, { createContext, ReactNode, useMemo, useState } from 'react'
import useCore from '../hooks/useCore'

export type CoreContextProps = ReturnType<typeof useCore>

export const CoreContext = createContext<CoreContextProps | null>(null)

interface CoreProviderProps {
  children: ReactNode
}

export const CoreProvider: React.FC<CoreProviderProps> = (props: CoreProviderProps) => {
  const { children } = props
  const core = useCore()
  const memoizedCoreState = useMemo(() => core, [core])

  return (
    <CoreContext.Provider value={memoizedCoreState}>
      {children}
    </CoreContext.Provider>
  )
}
