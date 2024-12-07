import React from 'react'
import { Stack, useNavigation } from 'expo-router'
import ProfileHeader from '@/src/components/profile/ProfileHeader'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderBackButton from '@/src/components/navigation/HeaderBackButton'
import { useAppTheme } from '@/src/constants/Themes'

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
          headerLeft: HeaderBackButton
        }}
      />
    </Stack>
  )
}

export default ProfileLayout
