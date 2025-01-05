import React from 'react'
import { Stack } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'
import HeaderBackButton from '@/src/components/navigation/HeaderBackButton'

const HomeFragranceLayout = () => {
  const theme = useAppTheme()

  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: theme.colors.background },
      headerBackVisible: false,
      headerTitle: '',
      headerLeft: () => <HeaderBackButton />
    }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='edit' options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  )
}

export default HomeFragranceLayout
