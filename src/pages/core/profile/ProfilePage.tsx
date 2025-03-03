import { StyleSheet } from 'react-native'
import React from 'react'
import { type AuthUser } from '@/src/hooks/useAuth'
import { ScrollView } from 'react-native-gesture-handler'
import { type UserPreviewQuery } from '@/src/generated/graphql'
import UserPortrait from '@/src/components/common/user/UserPortrait'
import UserCollections from '@/src/components/common/user/UserCollections'
import UserLikes from '@/src/components/common/user/UserLikes'
import UserReviews from '@/src/components/common/user/UserReviews'

export interface ProfilePageProps {
  user: UserPreviewQuery['user'] | null
  currentUser?: AuthUser | null | undefined
}

const ProfilePage = (props: ProfilePageProps) => {
  const { user, currentUser } = props
  const isOwner = (currentUser != null) && currentUser.id === user?.id

  if (user == null) { return null } // TODO

  return (
    <ScrollView style={styles.wrapper}>
      <UserPortrait
        username={user.username}
        followers={user.followers}
        following={user.following}
        isOwner={isOwner}
      />
      <UserCollections
        collections={user.collections}
        username={user.username}
        isOwner={isOwner}
      />
      <UserLikes
        fragrances={[]}
        username={user.username}
        isOwner={isOwner}
      />
      <UserReviews
        reviews={[]}
        username={user.username}
        isOwner={isOwner}
      />
    </ScrollView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  wrapper: {
    padding: 20
  }
})
