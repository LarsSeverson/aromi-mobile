import { StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileCategory from './ProfileCategory'
import { Text } from 'react-native-paper'
import { FragrancePreviewCollection } from '@/src/hooks/useUserPreview'
import UserCollectionPreviewCard from './UserCollectionPreviewCard'
import ProfileEmpty from './ProfileEmpty'

const getEmptyCollectionText = (isOwner: boolean, username: string) => ({
  headline: isOwner ? 'You have no collections' : `${username} has no collections`,
  body: isOwner
    ? 'Start building your collections by exploring fragrances you love'
    : 'Check back later to see what new collections they create'
})

export interface UserCollectionsProps {
  collections: FragrancePreviewCollection[]
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
