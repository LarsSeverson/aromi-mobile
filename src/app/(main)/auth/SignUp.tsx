import React from 'react'
import SignUpPage from '@/src/pages/auth/SignUpPage'
import { useRouter } from 'expo-router'

const SignUp = () => {
  const router = useRouter()

  const gotoConfirmSignUp = () => {
    router.push('/(main)/auth/ConfirmSignUp')
  }

  const gotoLogIn = () => {
    router.dismissAll()
    router.push('/auth/LogIn')
  }

  return <SignUpPage onSignUp={gotoConfirmSignUp} onLogIn={gotoLogIn} />
}

export default SignUp
