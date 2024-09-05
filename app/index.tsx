import Home from '@/components/Home/Home'
import React from 'react'
import { SafeAreaView } from 'react-native'

import changeNavigationBarColor from 'react-native-navigation-bar-color'

changeNavigationBarColor('white', true)

const HomePage: React.FC = () => {
  return (
    <Home />
  )
}

export default HomePage
