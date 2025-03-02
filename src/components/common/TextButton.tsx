import { Colors } from '@/src/constants/Colors'
import { type StyleProp, StyleSheet, type TextStyle, type ViewStyle } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import type { ThemeBase } from 'react-native-paper'
import BouncyButton, { type BouncyButtonProps } from './BouncyButton'
import { type VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types'

interface TextButtonProps extends Omit<BouncyButtonProps, 'style'> {
  text: string
  style?: StyleProp<TextStyle>
  wrapperStyle?: ViewStyle | ViewStyle[] | undefined
  variant?: VariantProp<ThemeBase>

  onRenderText?: (text: string) => React.ReactNode
}

const TextButton = (props: TextButtonProps) => {
  const { text, style, wrapperStyle, variant, onRenderText, ...bouncyButtonProps } = props
  return (
    <BouncyButton {...bouncyButtonProps} style={wrapperStyle}>
      {(onRenderText != null) ? onRenderText(text) : <Text variant={variant} style={[styles.textStyle, style]}>{text}</Text>}
    </BouncyButton>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.button
  }
})

export default TextButton
