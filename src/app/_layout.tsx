import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { setStatusBarStyle } from 'expo-status-bar'
import { Amplify } from 'aws-amplify'
import amplifyConfig from '../amplifyconfiguration.json'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NotifierWrapper } from 'react-native-notifier'

Amplify.configure(amplifyConfig)

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_b6DRVfvJw',
      userPoolClientId: '1aop96ct6tm1oh2dttv8v1j2et',
      identityPoolId: 'us-east-2:bbae1053-0888-4120-85f4-5692fe6246ee',
      allowGuestAccess: true,
      signUpVerificationMethod: 'code'
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

setStatusBarStyle('dark')

const RootLayout = () => {
  const isAuthenticated = false
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotifierWrapper>
        <Stack screenOptions={{ headerShown: false }}>
          {isAuthenticated
            ? (
              <Stack.Screen name='(main)' />
              )
            : (
              <Stack.Screen name='(auth)' />
              )}
        </Stack>
      </NotifierWrapper>
    </GestureHandlerRootView>
  )
}

export default RootLayout

const styles = StyleSheet.create({})
