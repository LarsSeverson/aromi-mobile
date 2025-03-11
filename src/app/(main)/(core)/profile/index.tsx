import { useAuthContext } from '@/src/contexts/AuthContext'
import ProfilePage from '@/src/pages/core/profile/ProfilePage'
import React from 'react'
import { INVALID_ID } from '@/src/common/util-types'
import useUserActivity from '@/src/hooks/useUserActivity'

const Profile = () => {
  const { userInfo } = useAuthContext()

  const currentUser = userInfo.user
  const userId = currentUser?.id ?? INVALID_ID

  const { hasActivity } = useUserActivity(userId)

  if (currentUser == null) return null // TODO

  return (
    <ProfilePage
      user={currentUser}
      myProfile
      hasActivity={hasActivity}
    />
  )
}

export default Profile
