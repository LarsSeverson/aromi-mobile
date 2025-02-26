import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { FragranceReview } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import ProfileCategory from './ProfileCategory'
import FragranceReviewCard from '../home/fragrance-page/FragranceReviewCard'
import ProfileEmpty from './ProfileEmpty'

const getEmptyReviewsText = (isOwner: boolean, username: string) => ({
  headline: isOwner ? 'You have no reviews' : `${username} has no reviews`,
  body: isOwner
    ? "Review fragrances you've experienced, and they'll show up here"
    : 'Check back later to see what reviews they share.'
})

export interface UserReviewsProps {
  reviews: FragranceReview[]
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
