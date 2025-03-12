import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='fragrance' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)' options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  )
}

export default HomeLayout
