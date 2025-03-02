import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { AuthState } from '@/src/hooks/useAuth'
import { useAuthContext } from '@/src/contexts/AuthContext'

const MainIndex = () => {
  const { userInfo, initialized } = useAuthContext()

  const [splashHidden, setSplashHidden] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const hideSplash = async () => {
      try {
        await SplashScreen.hideAsync()
        setSplashHidden(true)
      } catch (error) {
        console.error('Failed to hide splash screen:', error)
      }
    }

    const authCheck = initialized && userInfo.state === AuthState.AUTHENTICATED

    setAuthenticated(authCheck)

    void (initialized && hideSplash())
  }, [initialized, userInfo.state])

  if (!splashHidden) return null

  if (authenticated) {
    return <Redirect href='/(core)' />
  }

  return <Redirect href='/auth' />
}

export default MainIndex
