import { Text, StyleSheet, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import BouncyButton from '../../Utils/BouncyButton'
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

const BlockLikeDislike: React.FC<LikeDislikeProps> = (props: LikeDislikeProps) => {
  const iconSize = props.iconSize || 15

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likes, setLikes] = useState(props.numLikes - props.numDislikes)

  const onLike = () => {
    setLiked(!liked)
    setDisliked(false)

    setLikes(prev => liked ? prev - 1 : prev + 1)

    if (props.onLike) {
      props.onLike()
    }
  }

  const onDislike = () => {
    setDisliked(!disliked)
    setLiked(false)

    setLikes(prev => disliked ? prev + 1 : prev - 1)

    if (props.onDislike) {
      props.onDislike()
    }
  }

  return (
    <View style={[styles.wrapper, props.style]}>
      <BouncyButton scaleTo={0.8} onPress={onLike} style={styles.buttonWrapper} contentStyle={styles.buttonContentWrapper}>
        <CIcon name={liked ? 'heart' : 'heart-outline'} size={iconSize} color={liked ? Colors.heart : Colors.black} />
        <Text adjustsFontSizeToFit style={[styles.textWrapper, { color: liked ? Colors.heart : disliked ? Colors.som : Colors.black }]}>{likes}</Text>
      </BouncyButton>
      <Divider orientation='vertical' width={1} color={Colors.black} />
      <BouncyButton scaleTo={0.8} onPress={onDislike} style={styles.buttonWrapper}>
        <AIcon name={disliked ? 'dislike1' : 'dislike2'} size={iconSize} color={disliked ? Colors.som : Colors.black} />
      </BouncyButton>
    </View>
  )
}

export default BlockLikeDislike

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
