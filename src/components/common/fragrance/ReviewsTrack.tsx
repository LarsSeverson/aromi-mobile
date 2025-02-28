import { StyleSheet, ViewStyle } from 'react-native'
import React, { useCallback } from 'react'
import PressableList, { PressableListProps, PressableRenderItemProps } from '../../common/PressableList'
import FragranceReviewCard from './FragranceReviewCard'
import { FragranceReview } from '@/src/gql/graphql'

export interface ReviewsTrackProps extends Omit<PressableListProps<FragranceReview>, 'data' | 'onRenderItem' | 'style'> {
  reviews: FragranceReview[]
  style?: ViewStyle
  onReviewPressed?: (review: FragranceReview) => void
}

const ReviewsTrack = (props: ReviewsTrackProps) => {
  const { reviews, style, onReviewPressed } = props

  const onRenderReview = useCallback(({ item: review }: PressableRenderItemProps<FragranceReview>) => {
    if (!review) return null

    return <FragranceReviewCard review={review} withVotes />
  }, [])

  const columnProps = reviews.length > 1 ? { columnWrapperStyle: StyleSheet.compose(styles.wrapper, style) } : {}

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
