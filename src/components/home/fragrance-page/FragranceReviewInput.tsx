import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import BouncyButton, { BouncyButtonProps } from '../../BouncyButton'
import { useAppTheme } from '@/src/constants/Themes'
import RatingStars from '../../RatingStars'

export interface FragranceReviewInputProps extends BouncyButtonProps {
  username?: string | undefined
}

const FragranceReviewInput = (props: FragranceReviewInputProps) => {
  const theme = useAppTheme()
  const { username = 'Your Username', ...rest } = props

  return (
    <BouncyButton scaleTo={0.995} {...rest}>
      <View style={[styles.buttonWrapper, { borderColor: theme.colors.surfaceDisabled }]}>
        <Text>{username}</Text>
        <RatingStars rating={0} size={18} emptyColor={theme.colors.onSurfaceDisabled} />
        <Text style={{ fontSize: 14, opacity: 0.8 }}>tap to review...</Text>
      </View>
    </BouncyButton>
  )
}

export default FragranceReviewInput

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 15,
    gap: 5
  }
})
