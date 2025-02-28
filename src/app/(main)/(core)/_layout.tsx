import NavBar from '@/src/components/common/navigation/NavBar'
import { Tabs } from 'expo-router'
import React, { useCallback, useState } from 'react'

const CoreLayout: React.FC = () => {
  const onRenderTabBar = useCallback((props: any) => {
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
