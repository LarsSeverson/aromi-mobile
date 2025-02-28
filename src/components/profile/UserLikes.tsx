import React from 'react'
import ProfileCategory from './ProfileCategory'
import ProfileEmpty from './ProfileEmpty'
import { UserPreviewQuery } from '@/src/gql/graphql'

const getEmptyLikesText = (isOwner: boolean, username: string) => ({
  headline: isOwner ? "You haven't liked any fragrances yet" : `${username} hasn't liked any fragrances yet`,
  body: isOwner
    ? "When you like a fragrance, it'll show up here"
    : 'Check back later to see what fragrances they like'
})

type Fragrances = NonNullable<UserPreviewQuery['user']>['likes']

export interface UserLikesProps {
  fragrances: Fragrances
  username: string
  isOwner?: boolean | undefined
}

const UserLikes = (props: UserLikesProps) => {
  const { fragrances, username, isOwner = false } = props
  const { headline, body } = getEmptyLikesText(isOwner, username)
  const noLikes = fragrances.length === 0

  return (
    <ProfileCategory title='Likes'>
      {noLikes
        ? <ProfileEmpty headline={headline} body={body} />
        : (fragrances.map(
            (collection, index) => null)
          )}
    </ProfileCategory>
  )
}

export default UserLikes
