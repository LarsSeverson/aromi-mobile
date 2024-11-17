import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SignUpPage from '@/src/pages/auth/SignUpPage'
import { useRouter } from 'expo-router'

const SignUp = () => {
  const router = useRouter()

  const gotoConfirmSignUp = () => {
    router.push('/(core)/home/(auth)/ConfirmSignUp')
  }

  const gotoLogin = () => {
    router.dismiss()
    router.push('/(core)/home/(auth)/LogIn')
  }

  return <SignUpPage onSignUp={gotoConfirmSignUp} onLogIn={gotoLogin} />
}

export default SignUp
