import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LogInPage from '@/src/pages/auth/LogInPage'
import { useRouter } from 'expo-router'

const LogIn = () => {
  const router = useRouter()

  const gotoSignUp = () => {
    router.dismiss()
    router.push('/(core)/home/(auth)/SignUp')
  }

  const gotoConfirmSignUp = () => {
    router.push('/(core)/home/(auth)/ConfirmSignUp')
  }

  const gotoForgotPassword = () => {
    router.push('/(core)/home/(auth)/ForgotPassword')
  }

  return (
    <LogInPage
      onLogIn={() => router.dismissAll()}
      onSignUp={gotoSignUp}
      onConfirmSignUp={gotoConfirmSignUp}
      onForgotPassword={gotoForgotPassword}
    />
  )
}

export default LogIn
