import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { AuthState } from '@/src/hooks/useAromiAuth'
import * as SplashScreen from 'expo-splash-screen'
import { signOut } from 'aws-amplify/auth'

const MainIndex = () => {
  const { userGetInfo } = useAromiAuthContext()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [splashHidden, setSplashHidden] = useState(false)

  useEffect(() => {
    const initializeAuth = async () => {
      const { success } = await userGetInfo()
      setAuthenticated(success)
      await signOut()
    }

    initializeAuth()
  }, [userGetInfo])

  useEffect(() => {
    const hideSplash = async () => {
      try {
        await SplashScreen.hideAsync()
        setSplashHidden(true)
      } catch (error) {
        console.error('Failed to hide splash screen:', error)
      }
    }

    if (authenticated !== null) {
      hideSplash()
    }
  }, [authenticated])

  if (authenticated === null || !splashHidden) {
    return null
  }

  if (authenticated) {
    return <Redirect href='/(core)/' />
  }

  return <Redirect href='/(auth)/' />
}

export default MainIndex
