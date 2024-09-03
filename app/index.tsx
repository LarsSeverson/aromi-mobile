import Home from '@/components/Home/Home'
import React from 'react'

import changeNavigationBarColor from 'react-native-navigation-bar-color'

changeNavigationBarColor('white', true)

const HomePage: React.FC = () => {
  return (
    <Home />
  )
}

export default HomePage
