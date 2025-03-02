import React from 'react'
import AuthCheckPage from '@/src/pages/auth/AuthCheckPage'
import { useRouter } from 'expo-router'

const AuthCheck = () => {
  const router = useRouter()

  const gotoSignUp = () => {
    router.push('/(core)/home/(auth)/SignUp')
  }

  const gotoLogIn = () => {
    router.push('/(core)/home/(auth)/LogIn')
  }

  return (
    <AuthCheckPage
      onSignUp={gotoSignUp}
      onLogIn={gotoLogIn}
    />
  )
}

export default AuthCheck
