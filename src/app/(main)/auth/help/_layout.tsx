import React from 'react'
import { Stack } from 'expo-router'
import { TextStyles } from '@/src/constants/TextStyles'
import { PaperProvider } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'
import { NotifierWrapper } from 'react-native-notifier'
import HeaderBackButton from '@/src/components/common/navigation/HeaderBackButton'
import HeaderCloseButton from '@/src/components/common/navigation/HeaderCloseButton'

const AuthHelpLayout = () => {
  const theme = useAppTheme()

  return (
    <PaperProvider theme={theme}>
      <NotifierWrapper>
        <Stack screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitle: 'Forgot password',
          headerTitleStyle: TextStyles.headerTitle,
          headerBackVisible: false,
          headerLeft: () => <HeaderBackButton />,
          headerRight: () => <HeaderCloseButton />
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
