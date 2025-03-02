import ConfirmPasswordResetPage from '@/src/pages/help/ConfirmResetPasswordPage'
import { useRouter } from 'expo-router'
import React from 'react'

const ConfirmPasswordReset = () => {
  const router = useRouter()

  const handleButtonPress = (email: string, code: string) => {
    router.navigate({ pathname: '/(core)/home/(auth)/ChangePassword', params: { email, code } })
  }

  return <ConfirmPasswordResetPage onContinue={handleButtonPress} />
}

export default ConfirmPasswordReset
