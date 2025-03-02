import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native'
import React, { useCallback } from 'react'
import { Icon } from 'react-native-elements'
import { useAppTheme } from '@/src/constants/Themes'

export interface RatingStarsProps {
  rating: number
  size?: number
  filledColor?: string
  emptyColor?: string
  style?: StyleProp<ViewStyle>
}

const RatingStars = (props: RatingStarsProps) => {
  const theme = useAppTheme()

  const {
    rating,
    size = 15,
    filledColor = theme.colors.card,
    emptyColor = theme.colors.card,
    style
  } = props

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

  const stars = Array.from({ length: 5 }, (_, index) => {
    const startNumber = index + 1
    const fillPercentage = rating >= startNumber ? 100 : (rating - (startNumber - 1)) * 100
    const width = fillPercentage === 100 ? fillPercentage : transformFillPercentage(fillPercentage)

    return (
      <View
        key={index}
        style={{ width: size, height: size, marginRight: 2 }}
      >
        <Icon
          type='font-awesome'
          name='star-o'
          size={size}
          color={emptyColor}
        />
        <View style={[styles.starWrapper, { width: `${width}%`, height: size }]}>
          <Icon
            type='font-awesome'
            name='star'
            size={size}
            color={filledColor}
          />
        </View>
      </View>
    )
  })

  return <View style={[styles.container, style]}>{stars}</View>
}

export default RatingStars

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  starWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden'
  }
})
