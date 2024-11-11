import React from 'react'
import { HomeProvider } from '@/src/contexts/HomeContext'
import HomePage from '@/src/pages/core/HomePage'

const HomeIndex = () => {
  return (
    <HomeProvider>
      <HomePage />
    </HomeProvider>
  )
}

export default HomeIndex
