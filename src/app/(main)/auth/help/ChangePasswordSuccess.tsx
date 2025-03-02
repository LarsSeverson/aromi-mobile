import React from 'react'
import ChangePasswordSuccessPage from '@/src/pages/help/ChangePasswordSuccessPage'
import { useRouter } from 'expo-router'

const ChangePasswordSuccess = () => {
  const router = useRouter()

  const handleButtonPress = () => {
    router.navigate('/auth/login')
  }

  return (
    <ChangePasswordSuccessPage buttonText='Log in' onButtonPress={handleButtonPress} />
  )
}

export default ChangePasswordSuccess
