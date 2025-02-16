import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FragranceReview } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import FragranceCategory from './FragranceCategory'
import ReviewsTrack from './ReviewsTrack'
import FragranceEmpty from './FragranceEmpty'

export interface FragranceReviewsPreviewProps {
  reviews: FragranceReview[]

  onExpandReview?: (review: FragranceReview) => void
  onExpandReviews?: () => void
  onWriteReview?: () => void
}

const FragranceReviewsPreview = (props: FragranceReviewsPreviewProps) => {
  const {
    reviews,

    onExpandReview,
    onExpandReviews,
    onWriteReview
  } = props

  return (
    <FragranceCategory title='Reviews' expandText='write a review' onExpand={onExpandReviews}>
      {reviews.length === 0
        ? <FragranceEmpty headline='There are no reviews yet' />
        : <ReviewsTrack reviews={reviews} onReviewPressed={onExpandReview} />}
    </FragranceCategory>
  )
}

export default FragranceReviewsPreview

const styles = StyleSheet.create({})
