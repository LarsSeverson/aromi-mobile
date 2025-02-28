import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import FragranceCategory from './FragranceCategory'
import ReviewsTrack from './ReviewsTrack'
import FragranceEmpty from './FragranceEmpty'
import { FragranceReview } from '@/src/gql/graphql'

export interface FragranceReviewsPreviewProps {
  reviews: FragranceReview[]

  onExpandReviews?: (reviewId?: number | undefined) => void
  onWriteReview?: () => void
}

const TopFragranceReviews = (props: FragranceReviewsPreviewProps) => {
  const {
    reviews,

    onExpandReviews,
    onWriteReview
  } = props

  const handleOnReviewPressed = useCallback((review: FragranceReview) => {
    onExpandReviews?.(review.id)
  }, [onExpandReviews])

  return (
    <FragranceCategory
      title='Top reviews'
      expandText='write a review'
      onCategoryPressed={onExpandReviews}
      onSeeAll={onExpandReviews}
    >
      {reviews.length === 0
        ? <FragranceEmpty headline='There are no reviews yet' />
        : <ReviewsTrack reviews={reviews} onReviewPressed={handleOnReviewPressed} />}
    </FragranceCategory>
  )
}

export default TopFragranceReviews
