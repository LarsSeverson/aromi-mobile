import { Colors } from '@/src/constants/Colors'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import type { TextProps, ThemeBase } from 'react-native-paper'
import BouncyButton, { BouncyButtonProps } from './BouncyButton'
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types'

interface TextButtonProps extends BouncyButtonProps {
  text: string
  style?: StyleProp<TextStyle>
  wrapperStyle?: ViewStyle
  variant?: VariantProp<ThemeBase>
}

const TextButton: React.FC<TextButtonProps> = (props: TextButtonProps) => {
  const { text, style, wrapperStyle, variant, ...bouncyButtonProps } = props
  return (
    <BouncyButton {...bouncyButtonProps} style={wrapperStyle}>
      <Text variant={variant} style={[styles.textStyle, style]}>{text}</Text>
    </BouncyButton>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.button
  }
})

export default TextButton
