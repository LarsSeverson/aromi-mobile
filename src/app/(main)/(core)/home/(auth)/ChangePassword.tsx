import ChangePasswordPage from '@/src/pages/help/ChangePasswordPage'
import { useRouter } from 'expo-router'
import React from 'react'

const ChangePassword = () => {
  const router = useRouter()

  const gotoChangePasswordSuccess = () => {
    router.push('/(core)/home/(auth)/ChangePasswordSuccess')
  }

  const gotoLogin = () => {
    router.navigate('/(core)/home/(auth)/LogIn')
  }

  return (
    <ChangePasswordPage
      onSuccess={gotoChangePasswordSuccess}
      onRemembered={gotoLogin}
    />
  )
}

export default ChangePassword
