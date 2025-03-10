import React from 'react'
import { Stack } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderBackButton from '@/src/components/common/navigation/HeaderBackButton'

const FragranceEditLayout = () => {
  const theme = useAppTheme()

  return (
    <Stack screenOptions={
      {
        headerStyle: { backgroundColor: theme.colors.background },
        headerBackVisible: false,
        headerShadowVisible: false,
        headerTitleStyle: TextStyles.headerTitle,
        headerLeft: () => <HeaderBackButton />
      }
    }
    >
      <Stack.Screen name='accords' options={{ headerTitle: 'Accords' }} />
      <Stack.Screen name='notes-layer' options={{ headerTitle: '' }} />
      <Stack.Screen name='review' options={{ headerTitle: 'Add Review' }} />
    </Stack>
  )
}

export default FragranceEditLayout
