import NavBar from '@/src/components/navigation/NavBar'
import { AuthGuardProvider } from '@/src/contexts/AuthGuardContext'
import { CoreProvider } from '@/src/contexts/CoreContext'
import { Tabs } from 'expo-router'
import React from 'react'

const CoreLayout: React.FC = () => {
  const hideNav = () => {
    console.log('Nav hide')
  }

  return (
    <CoreProvider hideNav={hideNav}>
      <AuthGuardProvider>
        <Tabs
          tabBar={(props) => <NavBar {...props} />}
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
      </AuthGuardProvider>
    </CoreProvider>
  )
}

export default CoreLayout
