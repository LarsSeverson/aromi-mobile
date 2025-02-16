import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FragranceReview } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { Text } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'
import RatingStars from '../../stats/RatingStars'

const formatDate = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  if (isNaN(parsedDate.getTime())) return ''

  return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export interface ExpandableReviewProps {
  review: FragranceReview
}

const ExpandableReview = (props: ExpandableReviewProps) => {
  const theme = useAppTheme()

  const { review } = props
  const {
    user,
    review: text,
    rating,
    dCreated,
    dModified
  } = review
  const { username } = user

  return (
    <View style={[styles.wrapper, { borderColor: theme.colors.surfaceDisabled }]}>
      <View>
        <Text variant='titleSmall'>{username}</Text>
      </View>
      <View>
        <Text
          numberOfLines={4}
          ellipsizeMode='tail'
          style={{ opacity: 0.9 }}
        >
          {text}
        </Text>
      </View>
      <View style={styles.ratingWrapper}>
        <RatingStars rating={rating} />
        <Text>●</Text>
        <Text>{formatDate(dCreated)}</Text>
      </View>
    </View>
  )
}

export default ExpandableReview

const styles = StyleSheet.create({
  wrapper: {
    height: 190,
    width: 325,
    borderRadius: 15,
    borderWidth: 2,
    padding: 15
  },
  ratingWrapper: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  }
})
