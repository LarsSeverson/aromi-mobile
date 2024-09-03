import styled from 'styled-components/native'
import { Colors } from '@/constants/Colors'
import { GestureResponderEvent, StyleProp, TextStyle, TouchableOpacity } from 'react-native'
import React from 'react'

export const TextButtonStyle = styled.Text`
  font-family: 'PalanquinDark-SemiBold';
  font-size: 15px;
  color: ${Colors.aromiLight.button};
`

interface TextButtonProps {
  children: React.ReactNode
  onPress?: (event: GestureResponderEvent) => void | undefined
  style: StyleProp<TextStyle>
}

const TextButton: React.FC<TextButtonProps> = (props: TextButtonProps) => {
  const { children, onPress, style } = props
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <TextButtonStyle>{children}</TextButtonStyle>
    </TouchableOpacity>
  )
}

export default TextButton
