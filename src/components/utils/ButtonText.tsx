import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from './BouncyButton'
import { Colors } from '@/src/constants/Colors'
import { ActivityIndicator, useTheme } from 'react-native-paper'

interface ButtonTextProps extends BouncyButtonProps {
  text: string
  loading?: boolean
  loadingColor?: string
  color?: string
  outlined?: boolean
  textColor?: string
  textStyle?: TextStyle
  icon?: React.ReactNode
}

const ButtonText: React.FC<ButtonTextProps> = (props: ButtonTextProps) => {
  const theme = useTheme()
  const { text, loading, loadingColor, color = theme.colors.surfaceVariant, outlined, textColor, textStyle, icon, style, ...buttonProps } = props

  const getButtonStyles = (color?: string, outlined?: boolean, customStyle?: any) => {
    return [
      styles.defaultButtonStyle,
      outlined ? styles.outlinedButtonStyle : {},
      { backgroundColor: color },
      customStyle
    ]
  }

  return (
    <BouncyButton disabled={loading} style={getButtonStyles(color, outlined, style)} {...buttonProps}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {icon}
        <Text style={[styles.defaultTextStyle, { color: textColor, opacity: loading ? 0 : 1 }, textStyle]}>{text}</Text>
        {loading && (
          <ActivityIndicator color={loadingColor} size={20} style={styles.activityIndicatorWrapper} />
        )}
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
  },
  activityIndicatorWrapper: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -10 }]
  }
})

export default ButtonText
