import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useNavigation, useRouter } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'
import { PaperProvider } from 'react-native-paper'
import { NotifierWrapper } from 'react-native-notifier'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderBackButton from '@/src/components/navigation/HeaderBackButton'
import HeaderCloseButton from '@/src/components/navigation/HeaderCloseButton'

const HomeAuthLayout = () => {
  const router = useRouter()
  const theme = useAppTheme()
  const nav = useNavigation()

  return (
    <PaperProvider theme={theme}>
      <NotifierWrapper>
        <Stack screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.background },
          headerBackVisible: false,
          headerTitleStyle: TextStyles.headerTitle,
          headerTitle: '',
          headerLeft: () => <HeaderBackButton scaleTo={0.95} iconSize={16} style={{ width: 35, height: 35, padding: 0 }} onPress={() => router.dismiss()} />,
          headerRight: () =>
            <HeaderCloseButton
              scaleTo={0.95}
              iconSize={16}
              style={{ width: 35, height: 35, padding: 0 }}
              onPress={() => nav.getParent()?.goBack()}
            />
        }}
        >
          <Stack.Screen name='AuthCheck' options={{ headerLeft: () => null }} />
        </Stack>
      </NotifierWrapper>
    </PaperProvider>
  )
}

export default HomeAuthLayout
