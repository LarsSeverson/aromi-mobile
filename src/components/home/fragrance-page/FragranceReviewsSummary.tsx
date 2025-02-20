import { StyleSheet, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import RatingStars from '../../RatingStars'
import { FragranceReviewDistribution } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { Text } from 'react-native-paper'
import LinearScaleBar from '../../LinearScaleBar'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

const MIN_WIDTH = 5

export interface FragranceReviewsSummaryProps {
  name: string
  brand: string
  rating: number
  reviewsCount: number
  distribution: FragranceReviewDistribution
}

const FragranceReviewsSummary = (props: FragranceReviewsSummaryProps) => {
  const theme = useAppTheme()
  const { name, brand, rating, reviewsCount, distribution } = props

  const maxDistCount = useMemo(() => Math.max(...Object.values(distribution).filter(val => typeof val === 'number')), [distribution])
  const getWidth = useCallback((count: number) => Math.max(count / maxDistCount * 100, MIN_WIDTH), [maxDistCount])

  return (
    <View style={{ flex: 1 }}>
      <Text variant='titleMedium'>{name}</Text>
      <Text variant='labelMedium'>{brand}</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.overallRatingWrapper}>
          <Text variant='titleSmall'>{rating}</Text>
          <RatingStars
            rating={rating}
            filledColor={Colors.button}
            emptyColor={theme.colors.onSurfaceDisabled}
            size={20}
          />
          <Text style={{ fontSize: 14, opacity: 0.8 }} variant='labelMedium'>{reviewsCount} reviews</Text>
        </View>
        <View style={{ gap: 2, flex: 4 }}>
          <View style={styles.distWrapper}>
            <Text>5</Text>
            <LinearScaleBar value={getWidth(distribution.five)} style={styles.ratingBarWrapper} />
          </View>
          <View style={styles.distWrapper}>
            <Text>4</Text>
            <LinearScaleBar
              value={getWidth(distribution.four)}
              color={Colors.cocoaBrown}
              style={styles.ratingBarWrapper}
            />
          </View>
          <View style={styles.distWrapper}>
            <Text>3</Text>
            <LinearScaleBar
              value={getWidth(distribution.three)}
              color={Colors.caramel}
              style={styles.ratingBarWrapper}
            />
          </View>
          <View style={styles.distWrapper}>
            <Text>2</Text>
            <LinearScaleBar
              value={getWidth(distribution.two)}
              color={Colors.butterscotch}
              style={styles.ratingBarWrapper}
            />
          </View>
          <View style={styles.distWrapper}>
            <Text>1</Text>
            <LinearScaleBar
              value={getWidth(distribution.one)}
              color={Colors.hunyadiYellow}
              style={styles.ratingBarWrapper}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default FragranceReviewsSummary

const styles = StyleSheet.create({
  overallRatingWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  distWrapper: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  ratingBarWrapper: {
    height: 10
  }
})
