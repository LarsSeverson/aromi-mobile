import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import BouncyButtonGroup from '@/src/components/common/BouncyButtonGroup'
import { Colors } from '@/src/constants/Colors'
import { useRouter } from 'expo-router'
import { showNotifaction } from '@/src/common/show-notification'
import { useAuthContext } from '@/src/contexts/AuthContext'

const ProfileSettingsPage = () => {
  const router = useRouter()
  const { userSignOut } = useAuthContext()

  const [loading, setLoading] = useState(false)

  const onSignOut = async () => {
    setLoading(true)
    const { success, error } = await userSignOut()
    setLoading(false)

    if (success) {
      router.replace('/')
      return
    }

    if (error != null) {
      showNotifaction.error(error.message)
    }
  }

  if (loading) {
    //
  }

  return (
    <ScrollView style={styles.wrapper}>
      <BouncyButtonGroup>
        <BouncyButtonGroup.Button
          text='Sign out'
          contentColor={Colors.negative}
          iconRightProps={{ name: 'logout', type: 'material-community' }}
          onPress={() => { void onSignOut() }}
        />
      </BouncyButtonGroup>
    </ScrollView>
  )
}

export default ProfileSettingsPage

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: Colors.placeholder
  }
})
