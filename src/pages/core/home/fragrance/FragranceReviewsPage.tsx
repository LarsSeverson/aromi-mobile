import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Text } from 'react-native-paper'
import PressableList, { PressableRenderItemProps } from '@/src/components/common/PressableList'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import useFragranceReviews from '@/src/hooks/useFragranceReviews'
import { useAuthContext } from '@/src/contexts/AuthContext'
import { useMyReview } from '@/src/hooks/useMyReview'
import FragranceReviewCard from '@/src/components/common/fragrance/FragranceReviewCard'
import { FragranceReview } from '@/src/gql/graphql'
import FragranceReviewsSummary from '@/src/components/common/fragrance/FragranceReviewsSummary'
import FragranceReviewButton from '@/src/components/common/fragrance/FragranceReviewButton'

const FragranceReviewsPage = () => {
  const router = useRouter()
  const { userInfo } = useAuthContext()
  const { fragranceId, reviewId = undefined } = useLocalSearchParams<{ fragranceId: string, reviewId: string }>()

  const {
    reviews,
    meta,
    loading: reviewsLoading,
    error: reviewsError,
    getMore,
    refresh
  } = useFragranceReviews({ fragranceId: Number(fragranceId) })

  const {
    myReview,
    loading: myReviewLoading,
    error: myReviewError,
    getMyReview
  } = useMyReview()

  const handleAddReviewPressed = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/review',
      params: { fragranceId }
    })
  }, [router, fragranceId])

  const getMoreReviews = useCallback(() => {
    !reviewsLoading && getMore()
  }, [reviewsLoading, getMore])

  const onRenderFragranceReview = useCallback(({ item: review }: PressableRenderItemProps<FragranceReview>) => {
    if (!review) return null

    return (
      <FragranceReviewCard
        review={review}
        expandable
        withVotes
        style={styles.reviewCard}
      />
    )
  }, [])

  useFocusEffect(useCallback(() => getMyReview(Number(fragranceId)), [fragranceId, getMyReview]))

  if (!meta) return null

  return (
    <PressableList
      data={reviews}
      onRenderItem={onRenderFragranceReview}
      pressableItemProps={{ scaleTo: 0.998 }}
      contentContainerStyle={{ gap: 10 }}
      style={styles.wrapper}
      onEndReached={getMoreReviews}
      ListHeaderComponent={
        <View style={{ gap: 12 }}>
          <FragranceReviewsSummary
            name={meta.name}
            brand={meta.brand}
            rating={meta.rating}
            reviewsCount={meta.reviewsCount}
            distribution={meta.reviewDistribution}
          />
          {myReview
            ? (
              <>
                <Text variant='titleMedium'>My review</Text>
                <FragranceReviewCard
                  review={myReview}
                  withVotes
                  style={styles.reviewCard}
                />
              </>
              )
            : (
              <>
                <Text variant='titleMedium'>Leave a review</Text>
                <FragranceReviewButton username={userInfo.user?.username} onPress={handleAddReviewPressed} />
              </>
              )}
          <View style={styles.reviewsHeading}>
            {reviews.length > 0 && <Text variant='titleMedium'>Top reviews</Text>}
          </View>
        </View>
    }
    />
  )
}

export default FragranceReviewsPage

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    gap: 10,
    flex: 1
  },
  reviewsHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  reviewCard: {
    width: '100%',
    height: 'auto'
  }
})
