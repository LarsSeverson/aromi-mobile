import { Text, StyleSheet, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import BlockButton from './BlockButton'
import { Colors } from '@/src/constants/Colors'
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AIcon from 'react-native-vector-icons/AntDesign'
import { Divider } from 'react-native-elements'

interface LikeDislikeProps {
  style?: ViewStyle

  iconSize?: number
  numLikes: number
  numDislikes: number

  onLike?: () => void
  onDislike?: () => void
}

const LikeDislike: React.FC<LikeDislikeProps> = (props: LikeDislikeProps) => {
  const iconSize = props.iconSize || 15

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const likes = props.numLikes - props.numDislikes

  const onLike = () => {
    setLiked(!liked)
    setDisliked(false)

    if (props.onLike) {
      props.onLike()
    }
  }

  const onDislike = () => {
    setDisliked(!disliked)
    setLiked(false)

    if (props.onDislike) {
      props.onDislike()
    }
  }

  return (
    <View style={[styles.wrapper, props.style]}>
      <BlockButton scaleTo={0.8} onPress={onLike} style={styles.buttonWrapper} contentStyle={styles.buttonContentWrapper}>
        <CIcon name={liked ? 'heart' : 'heart-outline'} size={iconSize} color={liked ? Colors.heart : Colors.black} />
        <Text adjustsFontSizeToFit style={[styles.textWrapper, { color: liked ? Colors.heart : disliked ? Colors.som : Colors.black }]}>{likes}</Text>
      </BlockButton>
      <Divider orientation='vertical' width={1} color={Colors.black} />
      <BlockButton scaleTo={0.8} onPress={onDislike} style={styles.buttonWrapper}>
        <AIcon name={disliked ? 'dislike1' : 'dislike2'} size={iconSize} color={disliked ? Colors.som : Colors.black} />
      </BlockButton>
    </View>
  )
}

export default LikeDislike

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CDCDCD',

    paddingTop: 5,
    paddingBottom: 5,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',

    height: 28
  },
  buttonWrapper: {
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonContentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 5
  },
  textWrapper: {
    fontSize: 12,
    fontWeight: 'bold',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
