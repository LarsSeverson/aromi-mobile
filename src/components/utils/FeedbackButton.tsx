import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from './BouncyButton'
import { useAppTheme } from '@/src/constants/Themes'

export interface FeedbackButtonProps extends BouncyButtonProps {
  text?: string | undefined
}

const FeedbackButton: React.FC<FeedbackButtonProps> = (props: FeedbackButtonProps) => {
  const theme = useAppTheme()
  const { text, ...rest } = props

  return (
    <BouncyButton style={[styles.wrapper, { borderColor: theme.colors.surfaceDisabled }]} {...rest}>
      <Text>{text || 'are we missing something?'}</Text>
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
