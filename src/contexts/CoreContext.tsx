import React, { createContext, ReactNode, useMemo, useState } from 'react'
import useCore from '../hooks/useCore'

export type CoreContextProps = ReturnType<typeof useCore>

export const CoreContext = createContext<CoreContextProps | null>(null)

interface CoreProviderProps {
  children: ReactNode
  hideNav: () => void
}

export const CoreProvider: React.FC<CoreProviderProps> = (props: CoreProviderProps) => {
  const { children, ...rest } = props
  const core = useCore()
  const memoizedCore = useMemo(() => ({ ...core, ...rest }), [core, rest])

  return (
    <CoreContext.Provider value={memoizedCore}>
      {children}
    </CoreContext.Provider>
  )
}
