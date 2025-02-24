import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-paper'
import BouncyButton from '../BouncyButton'
import { Icon } from 'react-native-elements'
import { useRouter } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'

const ProfileHeader = () => {
  const router = useRouter()
  const theme = useAppTheme()

  const gotoSettings = () => {
    router.push('/(core)/profile/settings')
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.wrapper}>
      <BouncyButton style={{ marginLeft: 'auto' }} onPress={gotoSettings}>
        <Icon name='cog' type='material-community' color={theme.colors.icon} style={{ opacity: 0.8 }} />
      </BouncyButton>
    </SafeAreaView>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
