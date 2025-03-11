import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import UserPortrait, { type CardUser } from '@/src/components/common/user/UserPortrait'
import UserCollections from '@/src/components/common/user/UserCollections'
import UserLikes from '@/src/components/common/user/UserLikes'
import UserReviews from '@/src/components/common/user/UserReviews'
import { Text } from 'react-native-paper'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export interface ProfilePageProps {
  user: CardUser
  myProfile: boolean
  hasActivity: boolean | null | undefined
}

const ProfilePage = (props: ProfilePageProps) => {
  const { user, myProfile, hasActivity } = props
  const [collectionsLoaded, setCollectionsLoaded] = useState(false)
  const [likesLoaded, setLikesLoaded] = useState(false)
  const [reviewsLoaded, setReviewsLoaded] = useState(false)

  const opacity = useSharedValue(0)
  const allLoaded = collectionsLoaded && likesLoaded && reviewsLoaded

  useEffect(() => {
    if (allLoaded || !(hasActivity ?? false)) {
      opacity.value = withTiming(1, { duration: 50 })
    }
  }, [allLoaded, opacity, hasActivity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <UserPortrait
        user={user}
        myPortrait={myProfile}
      />
      <Animated.View style={animatedStyle}>
        {!(hasActivity ?? true)
          ? (
            <View style={styles.empty}>
              <Text variant='headlineMedium'>No recent activity</Text>
              {myProfile && (
                <Text
                  variant='titleSmall'
                  style={{ textAlign: 'center' }}
                >
                  When you add collections, like fragrances, or leave reviews, they'll show up here
                </Text>)}
            </View>
            )
          : (
            <>
              <UserCollections
                user={user}
                myCollections={myProfile}
                onLoad={() => { setCollectionsLoaded(true) }}
              />
              <UserLikes
                user={user}
                myLikes={myProfile}
                onLoad={() => { setLikesLoaded(true) }}
              />

              <UserReviews
                user={user}
                myReviews={myProfile}
                onLoad={() => { setReviewsLoaded(true) }}
              />
            </>
            )}
      </Animated.View>
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
    justifyContent: 'center',
    paddingVertical: 100,
    gap: 10
  }
})
