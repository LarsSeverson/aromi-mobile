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
  wrapperStyle?: ViewStyle | ViewStyle[] | undefined
  variant?: VariantProp<ThemeBase>

  onRenderText?: (text: string) => React.ReactNode
}

const TextButton: React.FC<TextButtonProps> = (props: TextButtonProps) => {
  const { text, style, wrapperStyle, variant, onRenderText, ...bouncyButtonProps } = props
  return (
    <BouncyButton {...bouncyButtonProps} style={wrapperStyle}>
      {onRenderText ? onRenderText(text) : <Text variant={variant} style={[styles.textStyle, style]}>{text}</Text>}
    </BouncyButton>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.button
  }
})

export default TextButton
