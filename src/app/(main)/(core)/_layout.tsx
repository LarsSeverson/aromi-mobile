import NavBar from '@/src/components/navigation/NavBar'
import { Tabs } from 'expo-router'
import React, { useState } from 'react'

const CoreLayout: React.FC = () => {
  const [showTabBar, setShowTabBar] = useState(true)

  const hideNav = () => {
    setShowTabBar(false)
  }

  return (
    <Tabs
      tabBar={(props) => showTabBar && <NavBar {...props} />}
      screenOptions={
            {
              tabBarShowLabel: false,
              headerShown: false
            }
          }
    >
      <Tabs.Screen name='home' />
      <Tabs.Screen name='search' />
      <Tabs.Screen name='community' />
      <Tabs.Screen name='profile' />
    </Tabs>
  )
}

export default CoreLayout
