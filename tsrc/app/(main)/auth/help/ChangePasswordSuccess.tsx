import React from 'react'
import ChangePasswordSuccessPage from '@/src/pages/help/ChangePasswordSuccessPage'
import { useRouter } from 'expo-router'

const ChangePasswordSuccess = () => {
  const router = useRouter()

  const gotoLogin = () => {
    router.navigate('/auth/LogIn')
  }

  return (
    <ChangePasswordSuccessPage buttonText='Log in' onButtonPress={gotoLogin} />
  )
}

export default ChangePasswordSuccess
