import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'
import HeaderBackButton from '@/src/components/navigation/HeaderBackButton'
import { useCoreContext } from '@/src/hooks/useCoreContext'

const HomeFragranceLayout = () => {
  const coreContext = useCoreContext()
  const theme = useAppTheme()

  useEffect(() => {
    coreContext.hideNav()
  }, [coreContext])

  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: theme.colors.background },
      headerBackVisible: false,
      headerTitle: '',
      headerShadowVisible: false,
      headerLeft: () => <HeaderBackButton />
    }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='edit' options={{ headerShown: false }} />
    </Stack>
  )
}

export default HomeFragranceLayout
