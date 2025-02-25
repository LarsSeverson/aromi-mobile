import { StyleSheet } from 'react-native'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from '../common/BouncyButton'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import { useRouter } from 'expo-router'

export interface HeaderBackButtonProps extends BouncyButtonProps {}

const HeaderBackButton: React.FC<HeaderBackButtonProps> = () => {
  const router = useRouter()
  const iconSize = 18
  const theme = useAppTheme()

  const goBack = () => {
    if (router.canDismiss()) {
      router.dismiss()
    }
  }

  return (
    <BouncyButton scaleTo={0.95} style={styles.wrapper} onPress={goBack}>
      <Icon name='arrow-left' type='octicon' size={iconSize} color={theme.colors.card} />
    </BouncyButton>
  )
}

export default HeaderBackButton

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 50,
    borderWidth: 1,
    width: 40,
    height: 40,
    padding: 10,
    borderColor: Colors.placeholder2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
