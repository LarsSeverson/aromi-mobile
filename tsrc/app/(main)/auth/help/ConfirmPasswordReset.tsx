import React from 'react'
import ConfirmPasswordResetPage from '@/src/pages/help/ConfirmResetPasswordPage'
import { useRouter } from 'expo-router'

const ConfirmPasswordReset = () => {
  const router = useRouter()

  const gotoChangePassword = (email: string, code: string) => {
    router.push({ pathname: '/auth/help/ChangePassword', params: { email, code } })
  }

  return <ConfirmPasswordResetPage onContinue={gotoChangePassword} />
}

export default ConfirmPasswordReset
