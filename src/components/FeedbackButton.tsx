import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from './BouncyButton'
import { useAppTheme } from '@/src/constants/Themes'

export interface FeedbackButtonProps extends BouncyButtonProps {
  text?: string | undefined
  color?: string | undefined
  textColor?: string | undefined
}

const FeedbackButton: React.FC<FeedbackButtonProps> = (props: FeedbackButtonProps) => {
  const theme = useAppTheme()
  const { text, color, textColor, ...rest } = props

  return (
    <BouncyButton
      style={[styles.wrapper, {
        borderColor: color ? 'transparent' : theme.colors.surfaceDisabled,
        backgroundColor: color
      }]}
      {...rest}
    >
      <Text style={{ color: textColor }}>{text || 'are we missing something?'}</Text>
    </BouncyButton>
  )
}

export default FeedbackButton

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    margin: 10
  }
})
