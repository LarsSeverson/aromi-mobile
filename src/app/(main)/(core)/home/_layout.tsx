import React from 'react'
import { Stack } from 'expo-router'
import HomeHeader from '@/src/components/Home/HomeHeader'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ header: HomeHeader }} />
      <Stack.Screen name='(auth)' options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  )
}

export default HomeLayout
