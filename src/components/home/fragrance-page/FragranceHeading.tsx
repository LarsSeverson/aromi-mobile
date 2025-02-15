import { StyleSheet, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import BouncyButton from '../../BouncyButton'
import { Text } from 'react-native-paper'
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AIcon from 'react-native-vector-icons/AntDesign'
import { Colors } from '@/src/constants/Colors'
import RatingStars from '../../stats/RatingStars'
import { FragranceVote } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export interface FragranceHeadingProps {
  name: string
  brand: string
  rating: number
  reviewsCount: number
  vote: FragranceVote

  onVote?: (myVote: boolean | null) => void
  gotoReviews?: () => void
}

const FragranceHeading: React.FC<FragranceHeadingProps> = (props: FragranceHeadingProps) => {
  const {
    name,
    brand,
    rating,
    reviewsCount,
    vote,

    onVote,
    gotoReviews
  } = props

  const localVote = useRef(vote)
  const [curLiked, setCurLiked] = useState<boolean | null>(vote.myVote)

  const counts = useMemo(() => {
    const { likes, dislikes, myVote } = localVote.current
    const effectiveLikes = likes - (myVote === true ? 1 : 0) + (curLiked === true ? 1 : 0)
    const effectiveDislikes = dislikes - (myVote === false ? 1 : 0) + (curLiked === false ? 1 : 0)

    return {
      likesCount: effectiveLikes,
      dislikesCount: effectiveDislikes,
      reviewsCount
    }
  }, [curLiked, reviewsCount])

  const onLike = () => {
    const newLiked = curLiked ? null : true
    setCurLiked(newLiked)
    onVote?.(newLiked)
  }

  const onDislike = () => {
    const newLiked = curLiked === false ? null : true
    setCurLiked(newLiked)
    onVote?.(newLiked)
  }

  return (
    <View style={styles.wrapper}>
      <BouncyButton style={styles.ldContainer} contentStyle={styles.ldWrapper} onPress={onDislike}>
        <AIcon
          name={curLiked === false ? 'dislike1' : 'dislike2'}
          size={25}
          color={curLiked === false ? Colors.som : Colors.black}
        />
        <Text>{counts.dislikesCount}</Text>
      </BouncyButton>

      <View style={styles.titleWrapper}>
        <Text variant='titleMedium' style={{ fontWeight: 500 }}>{name}</Text>
        <Text variant='labelMedium'>{brand}</Text>
        <View style={styles.ratingsWrapper}>
          <Text>{rating}</Text>
          <RatingStars rating={rating} />
          <BouncyButton>
            <Text>(<Text style={{ color: Colors.button }}>{counts.reviewsCount}</Text>)</Text>
          </BouncyButton>
        </View>
      </View>

      <BouncyButton style={styles.ldContainer} contentStyle={styles.ldWrapper} onPress={onLike}>
        <CIcon name={curLiked ? 'heart' : 'heart-outline'} size={25} color={curLiked ? Colors.heart : Colors.black} />
        <Text>{counts.likesCount}</Text>
      </BouncyButton>
    </View>
  )
}

export default FragranceHeading

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ldContainer: {
    flex: 1
  },
  ldWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleWrapper: {
    flex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  }
})
