import React, { useState, useCallback } from 'react'
import { StyleSheet, View, StyleProp, ViewStyle, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAppTheme } from '../../constants/Themes'
import BouncyButton from './BouncyButton'

export interface EditableRatingStarsProps {
  rating: number
  size?: number
  filledColor?: string
  emptyColor?: string
  style?: StyleProp<ViewStyle>
  onRatingChange?: (rating: number) => void
}

const EditableRatingStars: React.FC<EditableRatingStarsProps> = (props: EditableRatingStarsProps) => {
  const theme = useAppTheme()
  const {
    rating,
    size = 15,
    filledColor = theme.colors.card,
    emptyColor = theme.colors.card,
    style,

    onRatingChange
  } = props
  const [currentRating, setCurrentRating] = useState<number>(rating)

  const transformFillPercentage = useCallback((percentage: number): number => {
    const center = 50
    if (percentage <= center) {
      return Math.max(0, percentage)
    }

    const deviation = percentage - center
    const scalingFactor = 1 - Math.abs(deviation) / 50
    const adjusted = center + deviation * scalingFactor

    return Math.max(0, Math.min(100, adjusted))
  }, [])

  const handlePress = useCallback((star: number) => {
    setCurrentRating(star)
    onRatingChange && onRatingChange(star)
  }, [onRatingChange])

  const stars = Array.from({ length: 5 }, (_, index) => {
    const startNumber = index + 1
    const fillPercentage = currentRating >= startNumber ? 100 : Math.max(0, (currentRating - (startNumber - 1)) * 100)
    const width = fillPercentage === 100 ? fillPercentage : transformFillPercentage(fillPercentage)

    return (
      <BouncyButton key={index} onPress={() => handlePress(startNumber)}>
        <View style={{ width: size, height: size, marginHorizontal: 2 }}>
          <Icon name='star-o' size={size} color={emptyColor} />
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${width}%`,
            height: size,
            overflow: 'hidden'
          }}
          >
            <Icon name='star' size={size} color={filledColor} />
          </View>
        </View>
      </BouncyButton>
    )
  })

  return <View style={[styles.container, style]}>{stars}</View>
}

export default EditableRatingStars

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})
