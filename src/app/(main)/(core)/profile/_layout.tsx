import React from 'react'
import { Stack, useNavigation } from 'expo-router'
import ProfileHeader from '@/src/components/profile/ProfileHeader'
import { TextStyles } from '@/src/constants/TextStyles'
import { useAppTheme } from '@/src/constants/Themes'
import HeaderBackButton from '@/src/components/common/navigation/HeaderBackButton'

const ProfileLayout = () => {
  const theme = useAppTheme()
  const nav = useNavigation()

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: theme.colors.background }, headerShadowVisible: false }}>
      <Stack.Screen name='index' options={{ header: ProfileHeader }} />
      <Stack.Screen
        name='settings'
        options={{
          headerTitle: 'Settings',
          headerTitleStyle: TextStyles.headerTitle,
          headerLeft: () => <HeaderBackButton />
        }}
      />
    </Stack>
  )
}

export default ProfileLayout
