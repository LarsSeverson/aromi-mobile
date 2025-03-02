import { useAuthContext } from '@/src/contexts/AuthContext'
import useUserPreview from '@/src/hooks/useUserPreview'
import ProfilePage from '@/src/pages/core/profile/ProfilePage'
import React from 'react'
import { INVALID_ID } from '@/src/common/util-types'

const Profile = () => {
  const { userInfo } = useAuthContext()

  const currentUser = userInfo.user
  const id = currentUser?.id ?? INVALID_ID

  const { user } = useUserPreview({ id })

  if (currentUser == null) {
    // TODO:
    return null
  }

  return (
    <ProfilePage
      user={user}
      currentUser={userInfo.user}
    />
  )
}

export default Profile
