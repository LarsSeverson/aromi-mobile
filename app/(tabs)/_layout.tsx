import NavBar from '@/components/Navigation/NavBar'
import { Tabs } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

const TabLayout: React.FC = () => {
  return (
    <Tabs tabBar={NavBar}>
      <Tabs.Screen name='home' options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tabs.Screen name='search' options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tabs.Screen name='community' options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tabs.Screen name='profile' options={{ headerShown: false, tabBarShowLabel: false }} />
    </Tabs>
  )
}

export default TabLayout
