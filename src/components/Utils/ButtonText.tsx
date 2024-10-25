import { StyleSheet, Text, TextStyle } from 'react-native'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from './BouncyButton'
import { Colors } from '@/src/constants/Colors'

interface ButtonTextProps extends BouncyButtonProps {
  text: string
  color?: string
  outlined?: boolean
  textColor?: string
  textStyle?: TextStyle
}

const ButtonText: React.FC<ButtonTextProps> = (props: ButtonTextProps) => {
  const { text, color, outlined, textColor, textStyle, ...buttonProps } = props
  return (
    <BouncyButton style={[styles.defaultButtonStyle, outlined ? styles.outlinedButtonStyle : {}, { backgroundColor: color }]} {...buttonProps}>
      <Text style={[styles.defaultTextStyle, { color: textColor }, textStyle]}>{text}</Text>
    </BouncyButton>
  )
}

const styles = StyleSheet.create({
  defaultButtonStyle: {
    borderRadius: 20,
    width: '100%',
    display: 'flex',
    padding: 11,
    alignItems: 'center'
  },
  outlinedButtonStyle: {
    borderRadius: 20,
    width: '100%',
    display: 'flex',
    padding: 11,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.placeholder3
  },
  defaultTextStyle: {
    fontFamily: 'PalanquinDark-Regular',
    fontSize: 13
  }
})

export default ButtonText
