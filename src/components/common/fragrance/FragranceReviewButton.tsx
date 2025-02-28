import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import BouncyButton, { BouncyButtonProps } from '../../common/BouncyButton'
import { useAppTheme } from '@/src/constants/Themes'
import RatingStars from '../../common/RatingStars'

export interface FragranceReviewButtonProps extends BouncyButtonProps {
  username?: string | undefined
}

const FragranceReviewButton = (props: FragranceReviewButtonProps) => {
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

export default FragranceReviewButton

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 15,
    gap: 5
  }
})
