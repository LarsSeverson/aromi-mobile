import React from 'react'
import ForgotPasswordPage from '@/src/pages/help/ForgotPassword'
import { useRouter } from 'expo-router'

const ForgotPassword = () => {
  const router = useRouter()

  const onContinue = () => {
    router.push('/help/ConfirmPasswordReset')
  }
  const onRememberedPassword = () => {
    router.navigate('/(auth)/LogIn')
  }
  return <ForgotPasswordPage onContinue={onContinue} onRememberedPassword={onRememberedPassword} />
}

export default ForgotPassword
