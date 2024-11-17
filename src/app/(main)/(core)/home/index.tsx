import React from 'react'
import { AuthGuardProvider } from '@/src/contexts/AuthGuardContext'
import HomePage from '@/src/pages/core/HomePage'

const HomeIndex = () => {
  return (
    <AuthGuardProvider>
      <HomePage />
    </AuthGuardProvider>
  )
}

export default HomeIndex
