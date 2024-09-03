import HomeHeader from '@/components/Home/HomeHeader'
import NavBar from '@/components/Navigation/NavBar'
import { Tabs } from 'expo-router'
import React from 'react'

import SystemNavigationBar from 'react-native-system-navigation-bar'

SystemNavigationBar.setNavigationColor('translucent')

const TabLayout: React.FC = () => {
  return (
    <Tabs tabBar={NavBar} screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen name='index' options={{ header: HomeHeader }} />
      <Tabs.Screen name='search' />
      <Tabs.Screen name='community' />
      <Tabs.Screen name='profile' />
    </Tabs>
  )
}

export default TabLayout
