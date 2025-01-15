import React, { useEffect, useState } from 'react'
import { Amplify } from 'aws-amplify'
import amplifyConfig from '../amplifyconfiguration.json'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NotifierWrapper } from 'react-native-notifier'
import { PaperProvider } from 'react-native-paper'
import { AromiAuthProvider } from '../contexts/AromiAuthContext'
import { Asset } from 'expo-asset'
import { appImages } from '@/src/assets/images/appImages'
import * as SplashScreen from 'expo-splash-screen'
import { Slot } from 'expo-router'
import { darkTheme, lightTheme } from '../constants/Themes'
import { Theme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'

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
  API: {
    GraphQL: {
      region: process.env.EXPO_PUBLIC_API_REGION,
      endpoint: process.env.EXPO_PUBLIC_API_ENDPOINT || '',
      defaultAuthMode: 'userPool'
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
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const theme = darkMode ? darkTheme : lightTheme

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
        setMounted(true)
      }
    }

    loadAssets()
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={theme as Theme}>
          <PaperProvider theme={theme}>
            <NotifierWrapper>
              <AromiAuthProvider>
                <Slot />
              </AromiAuthProvider>
            </NotifierWrapper>
          </PaperProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </>
  )
}

export default RootLayout
