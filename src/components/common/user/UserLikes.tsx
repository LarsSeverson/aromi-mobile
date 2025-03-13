import React, { useEffect } from 'react'
import ProfileCategory from '../../profile/ProfileCategory'
import ProfileEmpty from './ProfileEmpty'
import FragrancesTrack from '../fragrance/FragrancesTrack'
import { type CardUser } from './UserPortrait'
import useUserLikes from '@/src/hooks/useUserLikes'

const getEmptyLikesText = (isOwner: boolean, username: string) => ({
  headline: isOwner ? "You haven't liked any fragrances yet" : `${username} hasn't liked any fragrances yet`,
  body: isOwner
    ? "When you like a fragrance, it'll show up here"
    : 'Check back later to see what fragrances they like'
})

export interface UserLikesProps {
  user: CardUser
  myLikes?: boolean | undefined
  onLoad?: () => void
}

const UserLikes = (props: UserLikesProps) => {
  const { user, myLikes = false, onLoad } = props
  const { headline, body } = getEmptyLikesText(myLikes, user.username)

  const { data: likes, loading } = useUserLikes(user.id)

  const noLikes = likes.length === 0

  useEffect(() => {
    if (!loading) {
      onLoad?.()
    }
  }, [loading, onLoad])

  if (loading) return null // TODO
  if (likes == null) return null

  return (
    <ProfileCategory title='Likes'>
      {noLikes
        ? (
          <ProfileEmpty
            headline={headline}
            body={body}
          />
          )
        : (
          <FragrancesTrack
            fragrances={likes}
          />
          )}
    </ProfileCategory>
  )
}

export default UserLikes
