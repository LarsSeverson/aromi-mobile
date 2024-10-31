import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { signOut } from 'aws-amplify/auth'

const MainLayout = () => {
  const { userGetInfo } = useAromiAuthContext()
  const router = useRouter()

  useEffect(() => {
    const getUserInfo = async () => {
      // const { success } = await userGetInfo()

      // if (success) {
      await signOut()
      // router.replace('/(core)/')
      // }
    }

    getUserInfo()
  }, [userGetInfo, router])

  return (
    <Stack screenOptions={{ headerShown: false }} />
  )
}

export default MainLayout
