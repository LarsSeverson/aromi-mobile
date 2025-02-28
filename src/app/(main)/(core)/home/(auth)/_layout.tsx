import React from 'react'
import { Stack } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'
import { PaperProvider } from 'react-native-paper'
import { NotifierWrapper } from 'react-native-notifier'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderBackButton from '@/src/components/common/navigation/HeaderBackButton'
import HeaderCloseButton from '@/src/components/common/navigation/HeaderCloseButton'

const HomeAuthLayout = () => {
  const theme = useAppTheme()

  return (
    <PaperProvider theme={theme}>
      <NotifierWrapper>
        <Stack screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.background },
          headerBackVisible: false,
          headerTitleStyle: TextStyles.headerTitle,
          headerTitle: '',
          headerLeft: () => <HeaderBackButton />,
          headerRight: () => <HeaderCloseButton />
        }}
        >
          <Stack.Screen name='AuthCheck' options={{ headerLeft: () => null }} />
        </Stack>
      </NotifierWrapper>
    </PaperProvider>
  )
}

export default HomeAuthLayout
