import React, { useCallback } from 'react'
import FragranceCategory from './FragranceCategory'
import FragranceEmpty from './FragranceEmpty'
import { type FragranceReview } from '@/src/generated/graphql'
import ReviewsTrack from './ReviewsTrack'
import { type FragranceInfo } from '@/src/hooks/useFragranceInfo'
import useFragranceReviews from '@/src/hooks/useFragranceReviews'

export interface FragranceReviewsPreviewProps {
  fragranceInfo: FragranceInfo
  onExpandReviews?: (reviewId?: number | undefined) => void
  onWriteReview?: () => void
}

const TopFragranceReviews = (props: FragranceReviewsPreviewProps) => {
  const { fragranceInfo, onExpandReviews } = props

  const { data: reviews, loading } = useFragranceReviews(fragranceInfo.id)

  const handleOnReviewPressed = useCallback((review: FragranceReview) => {
    onExpandReviews?.(review.id)
  }, [onExpandReviews])

  if (loading) return null

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
