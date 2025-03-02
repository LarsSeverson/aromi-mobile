import React from 'react'
import { Stack } from 'expo-router'
import { useTheme } from 'react-native-paper'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderBackButton from '@/src/components/common/navigation/HeaderBackButton'

const AuthLayout = () => {
  const theme = useTheme()

  return (
    <Stack screenOptions={{
      headerShadowVisible: false,
      headerTitleStyle: TextStyles.headerTitle,
      headerStyle: { backgroundColor: theme.colors.background },
      headerLeft: () => <HeaderBackButton />
    }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='SignUp' options={{ headerTitle: 'Sign up' }} />
      <Stack.Screen name='ConfirmSignUp' options={{ headerTitle: 'Sign up' }} />
      <Stack.Screen name='LogIn' options={{ headerTitle: 'Log in' }} />
      <Stack.Screen name='help' options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  )
}

export default AuthLayout
