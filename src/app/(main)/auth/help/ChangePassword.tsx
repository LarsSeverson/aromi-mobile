import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChangePasswordPage from '@/src/pages/help/ChangePasswordPage'
import { useRouter } from 'expo-router'

const ChangePassword = () => {
  const router = useRouter()

  const gotoChangePasswordSuccess = () => {
    router.push('/auth/help/ChangePasswordSuccess')
  }

  const gotoLogin = () => {
    router.navigate('/auth/LogIn')
  }

  return <ChangePasswordPage onSuccess={gotoChangePasswordSuccess} onRemembered={gotoLogin} />
}

export default ChangePassword

const styles = StyleSheet.create({})
