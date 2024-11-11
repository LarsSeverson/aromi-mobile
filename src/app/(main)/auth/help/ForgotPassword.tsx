import React from 'react'
import ForgotPasswordPage from '@/src/pages/help/ForgotPasswordPage'
import { useRouter } from 'expo-router'

const ForgotPassword = () => {
  const router = useRouter()

  const onContinue = (email: string) => {
    router.push({ pathname: '/auth/help/ConfirmPasswordReset', params: { email } })
  }

  const onRememberedPassword = () => {
    router.navigate('/auth/LogIn')
  }

  return <ForgotPasswordPage onContinue={onContinue} onRememberedPassword={onRememberedPassword} />
}

export default ForgotPassword
