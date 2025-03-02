import React from 'react'
import ProfileCategory from './ProfileCategory'
import UserCollectionPreviewCard from './UserCollectionPreviewCard'
import ProfileEmpty from './ProfileEmpty'
import { UserPreviewQuery } from '@/src/types/graphql'

const getEmptyCollectionText = (isOwner: boolean, username: string) => ({
  headline: isOwner ? 'You have no collections' : `${username} has no collections`,
  body: isOwner
    ? 'Start building your collections by exploring fragrances you love'
    : 'Check back later to see what new collections they create'
})

type Collections = NonNullable<UserPreviewQuery['user']>['collections']

export interface UserCollectionsProps {
  collections: Collections
  username: string
  isOwner?: boolean | undefined
}

const UserCollections = (props: UserCollectionsProps) => {
  const { collections, username, isOwner = false } = props
  const { headline, body } = getEmptyCollectionText(isOwner, username)
  const noCollections = collections.length === 0

  return (
    <ProfileCategory title='Collections'>
      {noCollections
        ? <ProfileEmpty headline={headline} body={body} />
        : (collections.map(
            (collection, index) => <UserCollectionPreviewCard key={index} collection={collection} />
          ))}
    </ProfileCategory>
  )
}

export default UserCollections
