import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderBackButton from '@/src/components/Navigation/HeaderBackButton'
import HeaderCloseButton from '@/src/components/Navigation/HeaderCloseButton'

const AuthHelpLayout = () => {
  const router = useRouter()

  return (
    <Stack screenOptions={{
      headerShadowVisible: false,
      headerTitle: 'Forgot password',
      headerTitleStyle: TextStyles.headerTitle,
      headerLeft: () => <HeaderBackButton scaleTo={0.95} iconSize={16} style={{ width: 35, height: 35, padding: 0 }} onPress={() => router.dismiss()} />,
      headerRight: () => <HeaderCloseButton scaleTo={0.95} onPress={() => router.navigate('/(auth)/LogIn')} />
    }}
    >
      <Stack.Screen name='ForgotPassword' options={{ headerLeft: () => null }} />
      <Stack.Screen name='ConfirmPasswordReset' />
    </Stack>
  )
}

export default AuthHelpLayout

const styles = StyleSheet.create({})
