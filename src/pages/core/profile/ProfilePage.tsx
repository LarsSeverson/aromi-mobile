import { StyleSheet, View } from 'react-native'
import React from 'react'
import UserPortrait from '@/src/components/profile/UserPortrait'
import UserCollections from '@/src/components/profile/UserCollections'
import { AuthUser } from '@/src/hooks/useAuth'
import { UserPreview } from '@/src/hooks/useUserPreview'

export interface ProfilePageProps {
  user: UserPreview | null
  currentUser?: AuthUser | null | undefined
}

const ProfilePage = (props: ProfilePageProps) => {
  const { user, currentUser } = props
  const isOwner = !!(currentUser && currentUser.id === user?.id)

  if (!user) { return null } // TODO

  return (
    <View style={styles.wrapper}>
      <UserPortrait
        username={user.username}
        followers={user.followers}
        following={user.following}
        editable={isOwner}
      />
      <UserCollections
        collections={user.collections}
        editable={isOwner}
      />
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  wrapper: {
    padding: 20
  }
})
