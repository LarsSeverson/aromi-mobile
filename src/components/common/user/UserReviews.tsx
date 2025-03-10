import React from 'react'
import ProfileCategory from '../../profile/ProfileCategory'
import ProfileEmpty from './ProfileEmpty'
import { type CardFragranceReview } from '../fragrance/FragranceReviewCard'
import ReviewsTrack from '../fragrance/ReviewsTrack'

const getEmptyReviewsText = (isOwner: boolean, username: string) => ({
  headline: isOwner ? 'You have no reviews' : `${username} has no reviews`,
  body: isOwner
    ? "Review fragrances you've experienced, and they'll show up here"
    : 'Check back later to see what reviews they share.'
})

export interface UserReviewsProps {
  reviews: CardFragranceReview[]
  username: string
  isOwner?: boolean | undefined
}

const UserReviews = (props: UserReviewsProps) => {
  const { reviews, username, isOwner = false } = props
  const { headline, body } = getEmptyReviewsText(isOwner, username)
  const noReviews = reviews.length === 0

  return (
    <ProfileCategory
      title='Reviews'
      showSeeAll
    >
      {noReviews
        ? <ProfileEmpty
            headline={headline}
            body={body}
          />
        : <ReviewsTrack reviews={reviews} />}
    </ProfileCategory>
  )
}

export default UserReviews
