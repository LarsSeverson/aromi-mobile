import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import BouncyButton from '../BouncyButton'
import { Text } from 'react-native-paper'
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AIcon from 'react-native-vector-icons/AntDesign'
import { Colors } from '@/src/constants/Colors'
import RatingStars from '../stats/RatingStars'

export interface FragranceHeadingProps {
  name: string
  brand: string
  rating: number
  reviewCount: number
  dislikes: number
  likes: number

  gotoReviews?: () => void
}

const FragranceHeading: React.FC<FragranceHeadingProps> = ({ name, brand, rating, reviewCount, dislikes, likes }) => {
  const [liked, setLiked] = useState<boolean>(false)
  const [disliked, setDisliked] = useState<boolean>(false)

  const likeFragrance = () => {
    if (disliked) {
      setDisliked(false)
    }

    setLiked(!liked)
  }

  const dislikeFragrance = () => {
    if (liked) {
      setLiked(false)
    }

    setDisliked(!disliked)
  }

  return (
    <View style={styles.wrapper}>
      <BouncyButton style={styles.ldContainer} contentStyle={styles.ldWrapper} onPress={dislikeFragrance}>
        <AIcon name={disliked ? 'dislike1' : 'dislike2'} size={25} color={disliked ? Colors.som : Colors.black} />
        <Text>{disliked ? dislikes + 1 : dislikes}</Text>
      </BouncyButton>

      <View style={styles.titleWrapper}>
        <Text variant='titleMedium' style={{ fontWeight: 500 }}>{name}</Text>
        <Text variant='labelMedium'>{brand}</Text>
        <View style={styles.ratingsWrapper}>
          <Text>{rating}</Text>
          <RatingStars rating={rating} />
          <BouncyButton>
            <Text>(<Text style={{ color: Colors.button }}>{reviewCount}</Text>)</Text>
          </BouncyButton>
        </View>
      </View>

      <BouncyButton style={styles.ldContainer} contentStyle={styles.ldWrapper} onPress={likeFragrance}>
        <CIcon name={liked ? 'heart' : 'heart-outline'} size={25} color={liked ? Colors.heart : Colors.black} />
        <Text>{liked ? likes + 1 : likes}</Text>
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
