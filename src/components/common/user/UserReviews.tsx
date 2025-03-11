import React, { useEffect } from 'react'
import ProfileCategory from '../../profile/ProfileCategory'
import ProfileEmpty from './ProfileEmpty'
import ReviewsTrack from '../fragrance/ReviewsTrack'
import { type CardUser } from './UserPortrait'
import useUserReviews from '@/src/hooks/useUserReviews'

const getEmptyReviewsText = (isOwner: boolean, username: string) => ({
  headline: isOwner ? 'You have no reviews' : `${username} has no reviews`,
  body: isOwner
    ? "Review fragrances you've experienced, and they'll show up here"
    : 'Check back later to see what reviews they share.'
})

export interface UserReviewsProps {
  user: CardUser
  myReviews?: boolean | undefined
  onLoad?: () => void
}

const UserReviews = (props: UserReviewsProps) => {
  const { user, myReviews = false, onLoad } = props
  const { headline, body } = getEmptyReviewsText(myReviews, user.username)

  const { data: reviews, loading } = useUserReviews(user.id)

  const noReviews = reviews.length === 0

  useEffect(() => {
    if (!loading) {
      onLoad?.()
    }
  }, [loading, onLoad])

  if (loading) return null
  if (reviews == null) return null

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
