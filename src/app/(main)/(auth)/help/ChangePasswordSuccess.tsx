import React from 'react'
import ChangePasswordSuccessPage from '@/src/pages/help/ChangePasswordSuccessPage'
import { useRouter } from 'expo-router'

const ChangePasswordSuccess = () => {
  const router = useRouter()

  const backToLogin = () => {
    router.navigate('/(auth)/LogIn')
  }

  return (
    <ChangePasswordSuccessPage buttonText='Log in' onButtonPress={backToLogin} />
  )
}

export default ChangePasswordSuccess
