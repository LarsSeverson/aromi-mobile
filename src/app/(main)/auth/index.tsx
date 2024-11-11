import React from 'react'
import AuthPage from '@/src/pages/auth/AuthPage'
import { useRouter } from 'expo-router'

const AuthIndex = () => {
  const router = useRouter()

  const gotoSignUp = () => {
    router.push('/auth/SignUp')
  }

  const gotoLogIn = () => {
    router.push('/auth/LogIn')
  }

  const gotoHome = () => {
    router.replace('/(core)')
  }

  return <AuthPage onSignUp={gotoSignUp} onLogIn={gotoLogIn} onHome={gotoHome} />
}

export default AuthIndex
