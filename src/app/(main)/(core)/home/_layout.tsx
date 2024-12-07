import React from 'react'
import { Stack, useNavigation } from 'expo-router'
import HomeHeader from '@/src/components/home/HomeHeader'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ header: HomeHeader }} />
      <Stack.Screen name='fragrance' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)' options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  )
}

export default HomeLayout
