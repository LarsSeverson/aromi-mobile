import React, { useEffect } from 'react'
import ProfileCategory from '../../profile/ProfileCategory'
import FragranceCollectionPreviewCard from '../fragrance/FragranceCollectionPreviewCard.tsx'
import ProfileEmpty from './ProfileEmpty'
import useUserCollections from '@/src/hooks/useUserCollections'
import { type CardUser } from './UserPortrait'

const getEmptyCollectionText = (isOwner: boolean, username: string) => ({
  headline: isOwner ? 'You have no collections' : `${username} has no collections`,
  body: isOwner
    ? 'Start building your collections by exploring fragrances you love'
    : 'Check back later to see what new collections they create'
})

export interface UserCollectionsProps {
  user: CardUser
  myCollections?: boolean | undefined
  onLoad?: () => void
}

const UserCollections = (props: UserCollectionsProps) => {
  const { user, myCollections = false, onLoad } = props
  const { headline, body } = getEmptyCollectionText(myCollections, user.username)

  const { data: collections, loading } = useUserCollections(user.id, 6)

  const noCollections = collections.length === 0

  useEffect(() => {
    if (!loading) {
      onLoad?.()
    }
  }, [loading, onLoad])

  if (loading) return null // TODO
  if (collections == null) return null

  return (
    <ProfileCategory title='Collections'>
      {noCollections
        ? <ProfileEmpty
            headline={headline}
            body={body}
          />
        : (collections.map(
            (collection, index) => (
              <FragranceCollectionPreviewCard
                key={index}
                collection={collection}
              />)
          ))}
    </ProfileCategory>
  )
}

export default UserCollections
