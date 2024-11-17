import NavBar from '@/src/components/navigation/NavBar'
import { CoreProvider } from '@/src/contexts/CoreContext'
import { Tabs } from 'expo-router'
import React from 'react'

const CoreLayout: React.FC = () => {
  return (
    <CoreProvider>
      <Tabs
        tabBar={(props) => <NavBar {...props} />}
        screenOptions={{ tabBarShowLabel: false, headerShown: false }}
      >
        <Tabs.Screen name='home' />
        <Tabs.Screen name='search' />
        <Tabs.Screen name='community' />
        <Tabs.Screen name='profile' />
      </Tabs>
    </CoreProvider>
  )
}

export default CoreLayout
