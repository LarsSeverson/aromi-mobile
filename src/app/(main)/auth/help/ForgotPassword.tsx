import React from 'react'
import ForgotPasswordPage from '@/src/pages/help/ForgotPasswordPage'
import { useRouter } from 'expo-router'

const ForgotPassword = () => {
  const router = useRouter()

  const gotoConfirmPasswordReset = (email: string) => {
    router.push({ pathname: '/auth/help/ConfirmPasswordReset', params: { email } })
  }

  const gotoRememberedPassword = () => {
    router.navigate('/auth/LogIn')
  }

  return (
    <ForgotPasswordPage
      onContinue={gotoConfirmPasswordReset}
      onRememberedPassword={gotoRememberedPassword}
    />
  )
}

export default ForgotPassword
