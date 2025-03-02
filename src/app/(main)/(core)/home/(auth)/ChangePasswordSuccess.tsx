import React from 'react'
import ChangePasswordSuccessPage from '@/src/pages/help/ChangePasswordSuccessPage'
import { useRouter } from 'expo-router'

const ChangePasswordSuccess = () => {
  const router = useRouter()

  const handleButtonPress = () => {
    router.navigate('/(core)/home')
  }

  return (
    <ChangePasswordSuccessPage buttonText='Go back' onButtonPress={handleButtonPress} />
  )
}

export default ChangePasswordSuccess
