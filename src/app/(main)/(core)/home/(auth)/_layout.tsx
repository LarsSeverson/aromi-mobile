import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'
import { PaperProvider } from 'react-native-paper'
import { NotifierWrapper } from 'react-native-notifier'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderBackButton from '@/src/components/Navigation/HeaderBackButton'
import HeaderCloseButton from '@/src/components/Navigation/HeaderCloseButton'

const HomeAuthLayout = () => {
  const router = useRouter()
  const theme = useAppTheme()

  return (
    <PaperProvider theme={theme}>
      <NotifierWrapper>
        <Stack screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.background },
          headerBackVisible: false,
          headerTitle: '',
          headerLeft: () => <HeaderBackButton scaleTo={0.95} iconSize={16} style={{ width: 35, height: 35, padding: 0 }} onPress={() => router.dismiss()} />,
          headerRight: () => <HeaderCloseButton scaleTo={0.95} iconSize={16} style={{ width: 35, height: 35, padding: 0 }} onPress={() => router.dismissAll()} />
        }}
        >
          <Stack.Screen name='AuthCheck' options={{ headerLeft: () => null }} />
          <Stack.Screen name='LogIn' />
          <Stack.Screen name='SignUp' />
          <Stack.Screen name='ConfirmSignUp' />
        </Stack>
      </NotifierWrapper>
    </PaperProvider>
  )
}

export default HomeAuthLayout
