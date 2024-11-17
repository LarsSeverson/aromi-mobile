import React from 'react'
import ChangePasswordSuccessPage from '@/src/pages/help/ChangePasswordSuccessPage'
import { useRouter } from 'expo-router'

const ChangePasswordSuccess = () => {
  const router = useRouter()

  const gotoLogin = () => {
    router.navigate('/(core)/home/')
  }

  return (
    <ChangePasswordSuccessPage buttonText='Go back' onButtonPress={gotoLogin} />
  )
}

export default ChangePasswordSuccess
