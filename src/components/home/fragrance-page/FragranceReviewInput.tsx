import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import BouncyButton from '../../BouncyButton'
import { useAppTheme } from '@/src/constants/Themes'
import RatingStars from '../../RatingStars'

export interface FragranceReviewInputProps {
  username?: string | undefined
}

const FragranceReviewInput = (props: FragranceReviewInputProps) => {
  const theme = useAppTheme()
  const { username = 'Your Username' } = props

  return (
    <View style={{ gap: 10 }}>
      <Text variant='titleMedium'>Leave a review</Text>
      <BouncyButton scaleTo={0.995}>
        <View style={[styles.buttonWrapper, { borderColor: theme.colors.surfaceDisabled }]}>
          <Text>{username}</Text>
          <RatingStars rating={0} size={18} emptyColor={theme.colors.onSurfaceDisabled} />
          <Text style={{ fontSize: 14, opacity: 0.8 }}>tap to review...</Text>
        </View>
      </BouncyButton>
    </View>
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
