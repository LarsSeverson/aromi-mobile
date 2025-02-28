import React from 'react'
import { StyleSheet } from 'react-native'
import ProfileCategory from './ProfileCategory'
import FragranceReviewCard from '../common/fragrance/FragranceReviewCard'
import ProfileEmpty from './ProfileEmpty'
import { UserPreviewQuery } from '@/src/gql/graphql'

const getEmptyReviewsText = (isOwner: boolean, username: string) => ({
  headline: isOwner ? 'You have no reviews' : `${username} has no reviews`,
  body: isOwner
    ? "Review fragrances you've experienced, and they'll show up here"
    : 'Check back later to see what reviews they share.'
})

type Reviews = NonNullable<UserPreviewQuery['user']>['reviews']

export interface UserReviewsProps {
  reviews: Reviews
  username: string
  isOwner?: boolean | undefined
}

const UserReviews = (props: UserReviewsProps) => {
  const { reviews, username, isOwner = false } = props
  const { headline, body } = getEmptyReviewsText(isOwner, username)
  const noReviews = reviews.length === 0

  return (
    <ProfileCategory title='Reviews'>
      {noReviews
        ? <ProfileEmpty headline={headline} body={body} />
        : (reviews.map(
            (review, index) => <FragranceReviewCard key={index} review={review} />
          ))}
    </ProfileCategory>
  )
}

export default UserReviews

const styles = StyleSheet.create({})
