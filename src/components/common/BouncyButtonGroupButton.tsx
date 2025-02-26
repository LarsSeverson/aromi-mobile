import { StyleSheet } from 'react-native'
import React from 'react'
import { Icon, IconProps } from 'react-native-elements'
import BouncyButton, { BouncyButtonProps } from './BouncyButton'
import { Text } from 'react-native-paper'

export interface BouncyButtonGroupButtonProps extends BouncyButtonProps {
  text?: string
  iconRightProps?: IconProps
  contentColor?: string
}

const BouncyButtonGroupButton: React.FC<BouncyButtonGroupButtonProps> = (props: BouncyButtonGroupButtonProps) => {
  const { text, iconRightProps, contentColor, ...buttonProps } = props
  const iconSize = 18

  return (
    <BouncyButton scaleTo={0.998} style={styles.wrapper} contentStyle={styles.contentWrapper} {...buttonProps}>
      {text && <Text style={{ color: contentColor }}>{text}</Text>}
      {iconRightProps && <Icon size={iconSize} color={contentColor} {...iconRightProps} containerStyle={styles.iconRightStyle} />}
    </BouncyButton>
  )
}

export default BouncyButtonGroupButton

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  contentWrapper: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  iconRightStyle: {
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
