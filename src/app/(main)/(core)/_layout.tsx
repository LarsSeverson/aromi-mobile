import HomeHeader from '@/src/components/Home/HomeHeader'
import NavBar from '@/src/components/Navigation/NavBar'
import { Tabs } from 'expo-router'
import React from 'react'

const CoreLayout: React.FC = () => {
  return (
    <Tabs
      tabBar={(props) => <NavBar {...props} />}
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tabs.Screen name='index' options={{ header: HomeHeader }} />
      <Tabs.Screen name='search' />
      <Tabs.Screen name='community' />
      <Tabs.Screen name='profile' />
    </Tabs>
  )
}

export default CoreLayout
