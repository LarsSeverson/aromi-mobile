import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChangePasswordPage from '@/src/pages/help/ChangePasswordPage'
import { useRouter } from 'expo-router'

const ChangePassword = () => {
  const router = useRouter()

  const onSuccess = () => {
    router.push('/auth/help/ChangePasswordSuccess')
  }

  const onRemembered = () => {
    router.navigate('/auth/LogIn')
  }

  return <ChangePasswordPage onSuccess={onSuccess} onRemembered={onRemembered} />
}

export default ChangePassword

const styles = StyleSheet.create({})
