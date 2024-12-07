import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-paper'
import BouncyButton from '../utils/BouncyButton'
import { Icon } from 'react-native-elements'
import { useRouter } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'

const ProfileHeader = () => {
  // const username = useLocalSearchParams().username as string
  const username = 'LarsSeverson'
  const router = useRouter()
  const theme = useAppTheme()

  const gotoSettings = () => {
    router.push('/(core)/profile/settings')
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.wrapper}>
      <Text variant='headlineSmall'>{username}</Text>
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
