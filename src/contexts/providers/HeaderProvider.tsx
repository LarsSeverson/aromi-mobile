import useHeader from '@/src/hooks/useHeader'
import React from 'react'
import { HeaderContext } from '../HeaderContext'

interface HeaderProviderProps {
  children: React.ReactNode
}

export const HeaderProvider = (props: HeaderProviderProps) => {
  const { children } = props
  const header = useHeader()

  return (
    <HeaderContext.Provider value={header}>
      {children}
    </HeaderContext.Provider>
  )
}
