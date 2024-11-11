import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import HeaderBackButton from '@/src/components/Navigation/HeaderBackButton'
import { useTheme } from 'react-native-paper'

const AuthLayout = () => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <Stack screenOptions={{
      headerShadowVisible: false,
      headerTitleStyle: styles.headerTitle,
      headerStyle: { backgroundColor: theme.colors.background },
      headerLeft: () => <HeaderBackButton scaleTo={0.95} onPress={() => router.dismiss()} />
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

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 13,
    fontFamily: 'PalanquinDark-Regular'
  }
})
