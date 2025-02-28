import { StyleSheet } from 'react-native'
import React from 'react'
import UserPortrait from '@/src/components/profile/UserPortrait'
import UserCollections from '@/src/components/profile/UserCollections'
import { AuthUser } from '@/src/hooks/useAuth'
import UserLikes from '@/src/components/profile/UserLikes'
import UserReviews from '@/src/components/profile/UserReviews'
import { ScrollView } from 'react-native-gesture-handler'
import { UserPreviewQuery } from '@/src/gql/graphql'

export interface ProfilePageProps {
  user: UserPreviewQuery['user'] | null
  currentUser?: AuthUser | null | undefined
}

const ProfilePage = (props: ProfilePageProps) => {
  const { user, currentUser } = props
  const isOwner = !!(currentUser && currentUser.id === user?.id)

  if (!user) { return null } // TODO

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
