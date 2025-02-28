import { StyleSheet } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import { useNavigation } from 'expo-router'
import BouncyButton from '../BouncyButton'

const HeaderCloseButton = () => {
  const nav = useNavigation()
  const iconSize = 18
  const theme = useAppTheme()

  const closeStack = () => {
    nav.getParent()?.goBack()
  }

  return (
    <BouncyButton scaleTo={0.95} style={styles.wrapper} onPress={closeStack}>
      <Icon name='x' type='octicon' size={iconSize} color={theme.colors.card} />
    </BouncyButton>
  )
}

export default HeaderCloseButton

const styles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.placeholder2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
