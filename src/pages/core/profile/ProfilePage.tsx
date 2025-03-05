import { StyleSheet, View } from 'react-native'
import React from 'react'
import { type AuthUser } from '@/src/hooks/useAuth'
import { ScrollView } from 'react-native-gesture-handler'
import { type UserPreviewQuery } from '@/src/generated/graphql'
import UserPortrait from '@/src/components/common/user/UserPortrait'
import UserCollections from '@/src/components/common/user/UserCollections'
import UserLikes from '@/src/components/common/user/UserLikes'
import UserReviews from '@/src/components/common/user/UserReviews'
import { Text } from 'react-native-paper'

export interface ProfilePageProps {
  user: UserPreviewQuery['user'] | null
  currentUser?: AuthUser | null | undefined
}

const ProfilePage = (props: ProfilePageProps) => {
  const { user, currentUser } = props
  const isOwner = (currentUser != null) && currentUser.id === user?.id
  const isCollectionsEmpty = user?.collections.length === 0
  const isLikesEmpty = user?.likes.length === 0
  const isReviewsEmpty = user?.reviews.length === 0
  const isEmpty = isCollectionsEmpty && isLikesEmpty && isReviewsEmpty

  if (user == null) { return null } // TODO

  return (
    <ScrollView style={styles.wrapper}>
      <UserPortrait
        username={user.username}
        followers={user.followers}
        following={user.following}
        isOwner={isOwner}
      />
      {isEmpty
        ? (
          <View style={styles.empty}>
            <Text variant='titleMedium'>No recent activity</Text>
            {isOwner && <Text>When you add collections, like fragrances, or leave reviews, they'll show up here</Text>}
          </View>
          )
        : (
          <>
            {!isCollectionsEmpty && (
              <UserCollections
                collections={user.collections}
                username={user.username}
                isOwner={isOwner}
              />)}
            {!isLikesEmpty && (
              <UserLikes
                fragrances={user.likes}
                username={user.username}
                isOwner={isOwner}
              />
            )}
            {!isReviewsEmpty && (
              <UserReviews
                reviews={user.reviews}
                username={user.username}
                isOwner={isOwner}
              />
            )}
          </>
          )}
    </ScrollView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
