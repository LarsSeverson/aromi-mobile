import React from 'react'
import ConfirmSignUpPage from '@/src/pages/auth/ConfirmSignUpPage'
import { useRouter } from 'expo-router'

const ConfirmSignUp = () => {
  const router = useRouter()

  const logIn = () => {
    router.replace('/(core)')
  }

  return <ConfirmSignUpPage onLogIn={logIn} onSuccess={() => router.dismiss()} onEdit={() => router.dismiss()} />
}

export default ConfirmSignUp
