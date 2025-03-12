import { StyleSheet, View, type ViewStyle } from 'react-native'
import React, { useCallback } from 'react'
import { Text } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'
import RatingStars from '../../common/RatingStars'
import ExpandableParagraph from '../../common/ExpandableParagraph'
import VoteButton from '../../common/VoteButton'
import useVoteOnReview from '@/src/hooks/useVoteOnReview'
import { Colors } from '@/src/constants/Colors'
import { type FragranceReview } from '@/src/generated/graphql'

const formatDate = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  if (isNaN(parsedDate.getTime())) return ''

  return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export type CardFragranceReview = Pick<FragranceReview,
'id' | 'author' | 'review' | 'rating' | 'dCreated' | 'dModified' | 'votes' | 'myVote'
>

export interface FragranceReviewCardProps {
  review: CardFragranceReview
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
    dCreated
  } = review

  const { voteOnReview } = useVoteOnReview()

  const handleOnVote = useCallback((vote: boolean | null) => {
    void voteOnReview({ myVote: vote, reviewId: review.id }, review)
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
        disabled={!(expandable ?? false)}
      />
      <View style={styles.ratingWrapper}>
        {(withVotes ?? false) &&
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
    borderWidth: 1,
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
