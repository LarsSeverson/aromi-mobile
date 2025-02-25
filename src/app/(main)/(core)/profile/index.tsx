import { useAuthContext } from '@/src/contexts/AuthContext'
import useUserPreview from '@/src/hooks/useUserPreview'
import ProfilePage from '@/src/pages/core/profile/ProfilePage'
import React from 'react'

const Profile = () => {
  const { userInfo } = useAuthContext()
  const currentUser = userInfo.user

  const { user, loading, error } = useUserPreview({ id: currentUser?.id })

  if (!userInfo.user) {
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
