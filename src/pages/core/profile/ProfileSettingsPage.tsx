import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import BouncyButtonGroup from '@/src/components/utils/BouncyButtonGroup'
import { Colors } from '@/src/constants/Colors'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { useRouter } from 'expo-router'
import { showNotifaction } from '@/src/components/notify/ShowNotification'

const ProfileSettingsPage = () => {
  const router = useRouter()
  const { userSignOut } = useAromiAuthContext()
  const [loading, setLoading] = useState(false)

  const onSignOut = async () => {
    setLoading(true)
    const { success, error } = await userSignOut()
    setLoading(false)

    if (success) {
      return router.replace('/')
    }

    if (error) {
      showNotifaction.error(error.message)
    }
  }

  return (
    <ScrollView style={styles.wrapper}>
      <BouncyButtonGroup>
        <BouncyButtonGroup.Button text='Sign out' contentColor={Colors.negative} iconRightProps={{ name: 'logout', type: 'material-community' }} onPress={onSignOut} />
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