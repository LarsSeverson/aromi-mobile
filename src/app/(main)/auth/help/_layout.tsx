import React from 'react'
import { Stack, useNavigation, useRouter } from 'expo-router'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderBackButton from '@/src/components/navigation/HeaderBackButton'
import HeaderCloseButton from '@/src/components/navigation/HeaderCloseButton'
import { PaperProvider } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'
import { NotifierWrapper } from 'react-native-notifier'

const AuthHelpLayout = () => {
  const router = useRouter()
  const theme = useAppTheme()
  const nav = useNavigation()

  return (
    <PaperProvider theme={theme}>
      <NotifierWrapper>
        <Stack screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitle: 'Forgot password',
          headerTitleStyle: TextStyles.headerTitle,
          headerBackVisible: false,
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
          <Stack.Screen name='ForgotPassword' options={{ headerLeft: () => null }} />
          <Stack.Screen name='ConfirmPasswordReset' />
          <Stack.Screen name='ChangePassword' />
          <Stack.Screen name='ChangePasswordSuccess' options={{ headerLeft: () => null }} />
        </Stack>
      </NotifierWrapper>
    </PaperProvider>
  )
}

export default AuthHelpLayout
