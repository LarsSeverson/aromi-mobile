import { StyleSheet, View, ViewStyle } from 'react-native'
import React, { useCallback, useState } from 'react'
import { FragranceReview } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { Text } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'
import RatingStars from '../../common/RatingStars'
import ExpandableParagraph from '../../common/ExpandableParagraph'
import VoteButton from '../../common/VoteButton'
import useVoteOnReview from '@/src/hooks/useVoteOnReview'
import { Colors } from '@/src/constants/Colors'

const formatDate = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  if (isNaN(parsedDate.getTime())) return ''

  return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export interface FragranceReviewCardProps {
  review: FragranceReview
  withVotes?: boolean | undefined
  expandable?: boolean | undefined

  style?: ViewStyle
}

const FragranceReviewCard = (props: FragranceReviewCardProps) => {
  const theme = useAppTheme()

  const { review, withVotes, expandable, style } = props
  const {
    author,
    review: text,
    rating,
    dCreated,
    dModified
  } = review

  const { voteOnReview, loading, error } = useVoteOnReview()

  const handleOnVote = useCallback((vote: boolean | null) => {
    voteOnReview({ myVote: vote, reviewId: review.id }, review)
  }, [review, voteOnReview])

  return (
    <View style={[styles.wrapper, style, { borderColor: theme.colors.surfaceDisabled }]}>
      <View style={styles.headingWrapper}>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{ flexShrink: 1 }}
        >
          {author}
        </Text>
        <View style={styles.headingWrapper}>
          <Text style={{ fontSize: 10 }}>●</Text>
          <Text style={{ fontSize: 13 }}>{formatDate(dCreated)}</Text>
        </View>
      </View>
      <ExpandableParagraph
        text={text}
        numLines={4}
        disabled={!expandable}
      />
      <View style={styles.ratingWrapper}>
        {withVotes &&
          <VoteButton
            votes={review.votes}
            onVote={handleOnVote}
            myVote={review.myVote}
          />}
        <RatingStars
          rating={rating}
          size={17}
          filledColor={Colors.button}
          emptyColor={theme.colors.onSurfaceDisabled}
        />
      </View>
    </View>
  )
}

export default FragranceReviewCard

const styles = StyleSheet.create({
  wrapper: {
    height: 190,
    width: 325,
    borderRadius: 15,
    borderWidth: 2,
    padding: 15,
    gap: 7
  },
  headingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  },
  ratingWrapper: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 7
  }
})
