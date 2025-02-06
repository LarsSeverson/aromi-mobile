import React, { useEffect, useMemo, useState } from 'react'
import { Amplify } from 'aws-amplify'
import amplifyConfig from '../amplifyconfiguration.json'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NotifierWrapper } from 'react-native-notifier'
import { PaperProvider } from 'react-native-paper'
import { Asset } from 'expo-asset'
import { appImages } from '@/src/assets/images/appImages'
import { Slot, SplashScreen } from 'expo-router'
import { darkTheme, lightTheme } from '../constants/Themes'
import { Theme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from '../contexts/providers/AuthProvider'
import { ClientProvider } from '../contexts/providers/ClientProvider'

SplashScreen.preventAutoHideAsync()

Amplify.configure(amplifyConfig)

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.EXPO_PUBLIC_USER_POOL_ID || '',
      userPoolClientId: process.env.EXPO_PUBLIC_USER_POOL_CLIENT_ID || '',
      identityPoolId: process.env.EXPO_PUBLIC_IDENTITY_POOL_ID || '',
      allowGuestAccess: true,
      signUpVerificationMethod: 'code',
      loginWith: {
        oauth: {
          domain: process.env.EXPO_PUBLIC_OAUTH_DOMAIN || '',
          scopes: ['email', 'profile', 'openid'],
          redirectSignIn: ['myapp://', 'http://localhost:8081/'],
          redirectSignOut: ['myapp://', 'http://localhost:8081/'],
          responseType: 'code'
        }
      }
    }
  },
  Storage: {
    S3: {
      region: process.env.EXPO_PUBLIC_API_REGION,
      bucket: process.env.EXPO_PUBLIC_BUCKET_NAME
    }
  }
})

const RootLayout = () => {
  const colorTheme = useColorScheme()

  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const theme = useMemo(() => darkMode ? darkTheme : lightTheme, [darkMode])

  useEffect(() => {
    setDarkMode(colorTheme === 'dark')
  }, [colorTheme])

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const imageAssets = Object.values(appImages).map((image) => Asset.fromModule(image).downloadAsync())
        await Promise.all(imageAssets)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    loadAssets()
  }, [])

  if (loading) {
    return null
  }

  return (
    <>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={theme as Theme}>
          <PaperProvider theme={theme}>
            <NotifierWrapper>
              <ClientProvider>
                <AuthProvider>
                  <Slot />
                </AuthProvider>
              </ClientProvider>
            </NotifierWrapper>
          </PaperProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </>
  )
}

export default RootLayout
