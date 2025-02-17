import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { Text } from 'react-native-paper'
import PressableList, { PressableRenderItemProps } from '@/src/components/PressableList'
import { useLocalSearchParams } from 'expo-router'
import useFragranceReviews from '@/src/hooks/useFragranceReviews'
import { FragranceReview } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import FragranceReviewCard from '@/src/components/home/fragrance-page/FragranceReviewCard'

const FragranceReviewsPage = () => {
  const { fragranceId, reviewId = undefined } = useLocalSearchParams<{ fragranceId: string, reviewId: string }>()

  const {
    reviews,
    meta,
    loading,
    error,
    getMore,
    refresh
  } = useFragranceReviews({ fragranceId: Number(fragranceId) })

  const onRenderFragranceReview = useCallback(({ item: review }: PressableRenderItemProps<FragranceReview>) => {
    if (!review) return null

    return (
      <FragranceReviewCard
        review={review}
        expandable
        withVotes
        style={{ width: '100%', height: 'auto' }}
      />
    )
  }, [])

  return (
    <View style={styles.wrapper}>
      <View style={styles.reviewsHeading}>
        <Text variant='titleSmall'>Top reviews</Text>
        <Text variant='titleSmall'>{meta.reviewsCount}</Text>
      </View>
      <PressableList
        data={reviews}
        onRenderItem={onRenderFragranceReview}
        pressableItemProps={{ scaleTo: 0.998 }}
      />
    </View>
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
  }
})
