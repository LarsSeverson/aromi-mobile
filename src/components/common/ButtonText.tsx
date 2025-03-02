import { StyleSheet, Text, type TextStyle, View } from 'react-native'
import React from 'react'
import BouncyButton, { type BouncyButtonProps } from './BouncyButton'
import { Colors } from '@/src/constants/Colors'
import { ActivityIndicator } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'

export interface ButtonTextProps extends BouncyButtonProps {
  text: string
  loading?: boolean
  loadingColor?: string
  color?: string
  outlined?: boolean
  textColor?: string
  textStyle?: TextStyle
  icon?: React.ReactNode
}

const ButtonText = (props: ButtonTextProps) => {
  const theme = useAppTheme()

  const {
    text,
    loading,
    loadingColor,
    color = theme.colors.surfaceVariant,
    outlined,
    textColor,
    textStyle,
    icon,
    style,
    ...buttonProps
  } = props

  const combinedStyle = StyleSheet.flatten([
    styles.wrapper,
    (outlined ?? false) ? styles.outlinedButtonStyle : null,
    { backgroundColor: color },
    style
  ])

  return (
    <BouncyButton
      disabled={loading}
      style={combinedStyle}
      {...buttonProps}
    >
      <View style={styles.contentWrapper}>
        {icon}
        <Text style={[styles.defaultTextStyle, { color: textColor, opacity: (loading ?? false) ? 0 : 1 }, textStyle]}>
          {text}
        </Text>
        {(loading ?? false) && (
          <ActivityIndicator
            color={loadingColor}
            size={20}
            style={styles.activityIndicatorWrapper}
          />
        )}
      </View>
    </BouncyButton>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    width: '100%',
    display: 'flex',
    padding: 11,
    alignItems: 'center'
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
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
