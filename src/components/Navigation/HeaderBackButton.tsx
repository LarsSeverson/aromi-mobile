import { StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from '../Utils/BouncyButton'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

interface HeaderBackButtonProps extends BouncyButtonProps {
  iconSize?: number
}

const HeaderBackButton: React.FC<HeaderBackButtonProps> = (props: HeaderBackButtonProps) => {
  const { iconSize = 18, ...restProps } = props
  const theme = useAppTheme()

  return (
    <BouncyButton {...restProps} style={[styles.wrapper, props.style as ViewStyle]}>
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
