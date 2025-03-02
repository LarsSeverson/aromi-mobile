import NavBar from '@/src/components/common/navigation/NavBar'
import { Tabs } from 'expo-router'
import React, { useCallback } from 'react'
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'

const CoreLayout = () => {
  const onRenderTabBar = useCallback((props: BottomTabBarProps) => {
    return <NavBar {...props} />
  }, [])

  return (
    <Tabs
      tabBar={onRenderTabBar}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false
      }}
    >
      <Tabs.Screen name='home' />
      <Tabs.Screen name='search' />
      <Tabs.Screen name='community' />
      <Tabs.Screen name='profile' />
    </Tabs>
  )
}

export default CoreLayout
