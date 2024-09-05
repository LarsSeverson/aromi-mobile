import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import HomeHeader from '@/components/Home/HomeHeader'
import NavBar from '@/components/Navigation/NavBar'
import { Tabs, Stack } from 'expo-router'
import React from 'react'
import { SafeAreaView, useColorScheme } from 'react-native'
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
