import Home from '@/components/Home/Home'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomePage: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Home />
    </SafeAreaView>
  )
}

export default HomePage
