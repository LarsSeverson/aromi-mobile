import ConfirmPasswordResetPage from '@/src/pages/help/ConfirmResetPasswordPage'
import { useRouter } from 'expo-router'
import React from 'react'

const ConfirmPasswordReset = () => {
  const router = useRouter()

  const gotoChangePassword = (email: string, code: string) => {
    router.push({ pathname: '/(core)/home/(auth)/ChangePassword', params: { email, code } })
  }

  return <ConfirmPasswordResetPage onContinue={gotoChangePassword} />
}

export default ConfirmPasswordReset
