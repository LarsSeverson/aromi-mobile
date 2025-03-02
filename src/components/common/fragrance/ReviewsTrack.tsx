import { StyleSheet, type ViewStyle } from 'react-native'
import React, { useCallback } from 'react'
import PressableList, { type PressableListProps, type PressableRenderItemProps } from '../../common/PressableList'
import FragranceReviewCard, { type CardFragranceReview } from './FragranceReviewCard'

type PressableProps = Omit<PressableListProps<CardFragranceReview>, 'style' | 'data' | 'onRenderItem'>

export interface ReviewsTrackProps extends PressableProps {
  reviews: CardFragranceReview[]
  style?: ViewStyle
  onReviewPressed?: (review: CardFragranceReview) => void
}

const ReviewsTrack = (props: ReviewsTrackProps) => {
  const { reviews, style, onReviewPressed } = props

  const onRenderReview = useCallback(({ item: review }: PressableRenderItemProps<CardFragranceReview>) => {
    if (review == null) return null

    return (
      <FragranceReviewCard
        review={review}
        withVotes
      />
    )
  }, [])

  const columnProps = reviews.length > 1
    ? { columnWrapperStyle: StyleSheet.compose(styles.wrapper, style) as ViewStyle }
    : {}

  return (
    <PressableList
      data={reviews}
      numRows={1}
      numColumns={reviews.length}
      {...columnProps}
      onRenderItem={onRenderReview}
      onItemPressed={onReviewPressed}
      pressableItemProps={{ scaleTo: 0.995 }}
    />
  )
}

export default ReviewsTrack

const styles = StyleSheet.create({
  wrapper: {
    gap: 10
  }
})
