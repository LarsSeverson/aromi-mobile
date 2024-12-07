import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'
import HeaderBackButton from '@/src/components/navigation/HeaderBackButton'
import HeaderCloseButton from '@/src/components/navigation/HeaderCloseButton'
import { TextStyles } from '@/src/constants/TextStyles'

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
    </Stack>
  )
}

export default HomeFragranceLayout
