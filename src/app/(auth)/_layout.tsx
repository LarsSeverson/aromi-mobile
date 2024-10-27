import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import HeaderBackButton from '@/src/components/Navigation/HeaderBackButton'

const AuthLayout = () => {
  const router = useRouter()

  return (
    <Stack screenOptions={{
      headerShadowVisible: false,
      headerTitleStyle: styles.headerTitle,
      headerLeft: () => <HeaderBackButton scaleTo={0.95} onPress={() => { router.dismiss() }} />
    }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='SignUp' options={{ headerTitle: 'Sign up' }} />
      <Stack.Screen name='ConfirmSignUp' options={{ headerTitle: 'Sign up' }} />
      <Stack.Screen name='LogIn' options={{ headerTitle: 'Log in' }} />
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
