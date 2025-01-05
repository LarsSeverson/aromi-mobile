import React from 'react'
import { Stack } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderCancelButton from '@/src/components/navigation/HeaderCancelButton'

const FragranceEditLayout = () => {
  const theme = useAppTheme()

  return (
    <Stack screenOptions={
      {
        headerStyle: { backgroundColor: theme.colors.background },
        headerBackVisible: false,
        headerTitleStyle: TextStyles.headerTitle,
        headerLeft: () => <HeaderCancelButton />
      }
    }
    >
      <Stack.Screen name='gender' options={{ headerTitle: 'Gender' }} />
      <Stack.Screen name='accords' options={{ headerTitle: 'Accords' }} />
    </Stack>
  )
}

export default FragranceEditLayout
