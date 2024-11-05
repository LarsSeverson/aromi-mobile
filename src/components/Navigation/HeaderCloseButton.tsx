import { StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from '../Utils/BouncyButton'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

interface HeaderCloseButtonProps extends BouncyButtonProps {
  iconSize?: number
}

const HeaderCloseButton: React.FC<HeaderCloseButtonProps> = (props: HeaderCloseButtonProps) => {
  const { iconSize = 18, ...restProps } = props
  const theme = useAppTheme()

  return (
    <BouncyButton {...restProps} style={[styles.wrapper, props.style as ViewStyle]}>
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
