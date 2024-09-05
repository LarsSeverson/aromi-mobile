import React from 'react'
import Profile from '@/components/Profile/Profile'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfilePage: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Profile />
    </SafeAreaView>
  )
}

export default ProfilePage