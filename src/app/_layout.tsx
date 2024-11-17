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

SplashScreen.preventAutoHideAsync()

Amplify.configure(amplifyConfig)

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_b6DRVfvJw',
      userPoolClientId: '1aop96ct6tm1oh2dttv8v1j2et',
      identityPoolId: 'us-east-2:bbae1053-0888-4120-85f4-5692fe6246ee',
      allowGuestAccess: true,
      signUpVerificationMethod: 'code',
      loginWith: {
        oauth: {
          domain: 'aromi.auth.us-east-2.amazoncognito.com',
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
      endpoint: 'https://iq7jbu76srexjfq4noopwo7c74.appsync-api.us-east-2.amazonaws.com/graphql',
      region: 'us-east-2',
      defaultAuthMode: 'userPool'
    }
  },
  Storage: {
    S3: {
      region: 'us-east-2',
      bucket: 'aromi-storage'
    }
  }
})

const RootLayout = () => {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const theme = darkMode ? darkTheme : lightTheme

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
  )
}

export default RootLayout
