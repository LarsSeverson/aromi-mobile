import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useAuthContext } from '@/src/contexts/AuthContext'
import { Text } from 'react-native-paper'
import UserPortrait from '@/src/components/profile/UserPortrait'
import UserCollections from '@/src/components/profile/UserCollections'

const ProfilePage = () => {
  const { userInfo } = useAuthContext()
  const user = userInfo.user

  if (!user) return null

  return (
    <View style={styles.wrapper}>
      <UserPortrait user={user} />
      <UserCollections />
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  wrapper: {
    padding: 20
  }
})
