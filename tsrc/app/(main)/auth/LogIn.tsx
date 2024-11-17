import React from 'react'
import LogInPage from '@/src/pages/auth/LogInPage'
import { useRouter } from 'expo-router'

const LogIn = () => {
  const router = useRouter()

  const gotoHome = () => {
    router.replace('/(core)')
  }

  const gotoConfirmSignUp = () => {
    router.push('/auth/ConfirmSignUp')
  }

  const gotoSignUp = () => {
    router.dismissAll()
    router.push('/auth/SignUp')
  }

  const gotoForgotPassword = async () => {
    router.push('/auth/help')
  }

  return <LogInPage onLogIn={gotoHome} onConfirmSignUp={gotoConfirmSignUp} onSignUp={gotoSignUp} onForgotPassword={gotoForgotPassword} />
}

export default LogIn
