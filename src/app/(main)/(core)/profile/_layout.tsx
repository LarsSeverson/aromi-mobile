import React from 'react'
import { Stack } from 'expo-router'
import ProfileHeader from '@/src/components/profile/ProfileHeader'
import { TextStyles } from '@/src/constants/TextStyles'
import HeaderBackButton from '@/src/components/common/navigation/HeaderBackButton'
import { HeaderProvider } from '@/src/contexts/providers/HeaderProvider'

const ProfileLayout = () => {
  return (
    <HeaderProvider>
      <ProfileHeader />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen
          name='settings'
          options={{
            headerTitle: 'Settings',
            headerTitleStyle: TextStyles.headerTitle,
            headerLeft: () => <HeaderBackButton />
          }}
        />
      </Stack>
    </HeaderProvider>
  )
}

export default ProfileLayout
