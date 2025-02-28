import React from 'react'
import { Stack } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderBackButton from '@/src/components/common/navigation/HeaderBackButton'

const HomeFragranceLayout = () => {
  const theme = useAppTheme()

  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: theme.colors.background },
      headerBackVisible: false,
      headerTitle: '',
      headerShadowVisible: false,
      headerTitleStyle: TextStyles.headerTitle,
      headerLeft: () => <HeaderBackButton />
    }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='note-layers' options={{ headerTitle: 'notes' }} />
      <Stack.Screen name='reviews' options={{ headerTitle: 'reviews' }} />
      <Stack.Screen name='edit' options={{ headerShown: false }} />
    </Stack>
  )
}

export default HomeFragranceLayout
