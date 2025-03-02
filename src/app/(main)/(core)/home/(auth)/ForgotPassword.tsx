import ForgotPasswordPage from '@/src/pages/help/ForgotPasswordPage'
import { useRouter } from 'expo-router'
import React from 'react'

const ForgotPassword = () => {
  const router = useRouter()

  const gotoConfirmPasswordReset = (email: string) => {
    router.push({ pathname: '/(core)/home/(auth)/ConfirmPasswordReset', params: { email } })
  }

  const gotoLogIn = () => {
    router.navigate('/(core)/home/(auth)/LogIn')
  }

  return <ForgotPasswordPage onContinue={gotoConfirmPasswordReset} onRememberedPassword={gotoLogIn} />
}

export default ForgotPassword
