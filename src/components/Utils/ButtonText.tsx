import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from './BouncyButton'
import { Colors } from '@/src/constants/Colors'
import { Icon } from 'react-native-elements'
import { IconType } from 'react-native-elements/dist/icons/Icon'

interface ButtonTextProps extends BouncyButtonProps {
  text: string
  color?: string
  outlined?: boolean
  textColor?: string
  textStyle?: TextStyle
  icon?: React.ReactNode
}

const ButtonText: React.FC<ButtonTextProps> = (props: ButtonTextProps) => {
  const { text, color, outlined, textColor, textStyle, icon, ...buttonProps } = props
  return (
    <BouncyButton style={[styles.defaultButtonStyle, outlined ? styles.outlinedButtonStyle : {}, { backgroundColor: color }]} {...buttonProps}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {icon}
        <Text style={[styles.defaultTextStyle, { color: textColor }, textStyle]}>{text}</Text>
      </View>
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
