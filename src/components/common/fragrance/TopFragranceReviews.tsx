import React, { useCallback } from 'react'
import FragranceCategory from './FragranceCategory'
import FragranceEmpty from './FragranceEmpty'
import { type FragranceReview } from '@/src/generated/graphql'
import { type CardFragranceReview } from './FragranceReviewCard'
import ReviewsTrack from './ReviewsTrack'

export interface FragranceReviewsPreviewProps {
  reviews: CardFragranceReview[]

  onExpandReviews?: (reviewId?: number | undefined) => void
  onWriteReview?: () => void
}

const TopFragranceReviews = (props: FragranceReviewsPreviewProps) => {
  const {
    reviews,

    onExpandReviews
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
        : <ReviewsTrack
            reviews={reviews}
            onReviewPressed={handleOnReviewPressed}
          />}
    </FragranceCategory>
  )
}

export default TopFragranceReviews
