import HomeHeader from '@/src/components/Home/HomeHeader'
import NavBar from '@/src/components/Navigation/NavBar'
import { Tabs } from 'expo-router'
import React from 'react'
import { useColorScheme } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'

SystemNavigationBar.setNavigationColor('translucent')

const TabLayout: React.FC = () => {
  // TODO:
  const colorScheme = useColorScheme()

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

export default TabLayout
