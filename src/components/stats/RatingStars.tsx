import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAppTheme } from '@/src/constants/Themes'

export interface RatingStarsProps {
  rating: number
  size?: number
  filledColor?: string
  emptyColor?: string
  style?: StyleProp<ViewStyle>
}

const RatingStars: React.FC<RatingStarsProps> = (props: RatingStarsProps) => {
  const theme = useAppTheme()
  const { rating, size = 15, filledColor = theme.colors.card, emptyColor = theme.colors.card, style } = props

  const transformFillPercentage = (percentage: number): number => {
    const center = 50

    if (percentage <= center) {
      return Math.max(0, percentage)
    }

    const deviation = percentage - center
    const scalingFactor = 1 - Math.abs(deviation) / 50
    const adjusted = center + deviation * scalingFactor

    return Math.max(0, Math.min(100, adjusted))
  }

  const stars = Array.from({ length: 5 }, (_, index) => {
    const startNumber = index + 1
    const fillPercentage = rating >= startNumber ? 100 : (rating - (startNumber - 1)) * 100
    const width = fillPercentage === 100 ? fillPercentage : transformFillPercentage(fillPercentage)

    return (
      <View key={index} style={{ width: size, height: size, marginRight: 2 }}>
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
    )
  })

  return <View style={[styles.container, style]}>{stars}</View>
}

export default RatingStars

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})
