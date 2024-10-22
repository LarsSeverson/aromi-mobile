import { Colors } from '@/src/constants/Colors'
import { StyleSheet, Text, TextStyle } from 'react-native'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from './BouncyButton'

interface TextButtonProps extends BouncyButtonProps {
  text: string
  style?: TextStyle
}

const TextButton: React.FC<TextButtonProps> = (props: TextButtonProps) => {
  const { text, style, ...bouncyButtonProps } = props
  return (
    <BouncyButton {...bouncyButtonProps}>
      <Text style={[styles.textStyle, style]}>{text}</Text>
    </BouncyButton>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'PalanquinDark-SemiBold',
    fontSize: 15,
    color: Colors.button
  }
})

export default TextButton
