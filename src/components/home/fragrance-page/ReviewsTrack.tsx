import { StyleSheet, View, ViewStyle } from 'react-native'
import React, { useCallback } from 'react'
import { FragranceReview } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import PressableList, { PressableListProps, PressableRenderItemProps } from '../../PressableList'
import ExpandableReview from './ExpandableReview'

export interface ReviewsTrackProps extends Omit<PressableListProps<FragranceReview>, 'data' | 'onRenderItem' | 'style'> {
  reviews: FragranceReview[]
  style?: ViewStyle
  onReviewPressed?: (review: FragranceReview) => void
}

const ReviewsTrack = (props: ReviewsTrackProps) => {
  const { reviews, style, onReviewPressed } = props

  const onRenderReview = useCallback(({ item: review }: PressableRenderItemProps<FragranceReview>) => {
    if (!review) return null

    return <ExpandableReview review={review} />
  }, [])

  const columnProps = reviews.length > 1 ? { columnWrapperStyle: StyleSheet.compose(styles.wrapper, style) } : {}

  return (
    <View>
      <PressableList
        data={reviews}
        numRows={1}
        numColumns={reviews.length}
        {...columnProps}
        onRenderItem={onRenderReview}
        onItemPressed={onReviewPressed}
        pressableItemProps={{ scaleTo: 0.995 }}
      />
    </View>
  )
}

export default ReviewsTrack

const styles = StyleSheet.create({
  wrapper: {
    gap: 10
  }
})
