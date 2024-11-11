import Home from '@/src/components/Home/Home'
import { HomeProvider } from '@/src/contexts/HomeContext'
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  )
}

export default HomePage
