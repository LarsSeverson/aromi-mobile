import { type LayoutChangeEvent, StyleSheet } from 'react-native'
import React from 'react'
import BouncyButton from '../common/BouncyButton'
import { Icon } from 'react-native-elements'
import { useRouter } from 'expo-router'
import { useAppTheme } from '@/src/constants/Themes'
import { useHeaderContext } from '@/src/contexts/HeaderContext'
import BlurSafeAreaView from '../common/BlurSafeAreaView'

const ProfileHeader = () => {
  const router = useRouter()
  const theme = useAppTheme()
  const { setHeaderHeight } = useHeaderContext()

  const onLayout = (event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height)
  }

  const gotoSettings = () => {
    router.push('/(core)/profile/settings')
  }

  return (
    <BlurSafeAreaView
      style={styles.wrapper}
      intensity={50}
      onLayout={onLayout}
    >
      <BouncyButton
        style={{ marginLeft: 'auto' }}
        onPress={gotoSettings}
      >
        <Icon
          name='cog'
          type='material-community'
          color={theme.colors.icon}
          style={{ opacity: 0.8 }}
        />
      </BouncyButton>
    </BlurSafeAreaView>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    width: '100%'
  }
})
