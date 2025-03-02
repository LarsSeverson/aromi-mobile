import React from 'react'
import ConfirmPasswordResetPage from '@/src/pages/help/ConfirmResetPasswordPage'
import { useRouter } from 'expo-router'

const ConfirmPasswordReset = () => {
  const route = useRouter()

  const handleButtonPress = (email: string, code: string) => {
    route.navigate({ pathname: '/auth/help/ChangePassword', params: { email, code } })
  }

  return <ConfirmPasswordResetPage onContinue={handleButtonPress} />
}

export default ConfirmPasswordReset
