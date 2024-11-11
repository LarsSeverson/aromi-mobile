import { Text, StyleSheet, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import BouncyButton from '../../Utils/BouncyButton'
import { Colors } from '@/src/constants/Colors'
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AIcon from 'react-native-vector-icons/AntDesign'
import { Divider } from 'react-native-elements'
import AuthActionGuard from '../../Auth/AuthActionGuard'
import { AuthActions } from '../../Auth/Utils/AuthActions'

interface LikeDislikeProps extends AuthActions {
  style?: ViewStyle

  iconSize?: number
  numLikes: number
  numDislikes: number

  onLike?: () => void
  onDislike?: () => void
}

const BlockLikeDislike: React.FC<LikeDislikeProps> = (props: LikeDislikeProps) => {
  const { style, iconSize = 15, numLikes, numDislikes, onLike, onDislike, onUnAuth } = props
  const [liked, setLiked] = useState<boolean | null>(null)
  const [likes, setLikes] = useState(numLikes - numDislikes)

  const onLikeHandle = () => {
    if (liked === true) {
      setLiked(null)
      setLikes((prev) => prev - 1)
    } else {
      setLiked(true)
      setLikes((prev) => prev + (liked === false ? 2 : 1))
    }

    onLike?.()
  }

  const onDislikeHandle = () => {
    if (liked === false) {
      setLiked(null)
      setLikes((prev) => prev + 1)
    } else {
      setLiked(false)
      setLikes((prev) => prev - (liked === true ? 2 : 1))
    }

    onDislike?.()
  }

  return (
    <View style={[styles.wrapper, style]}>
      <AuthActionGuard onUnAuth={onUnAuth}>
        <BouncyButton scaleTo={0.8} onPress={onLikeHandle} style={styles.buttonWrapper} contentStyle={styles.buttonContentWrapper}>
          <CIcon name={liked ? 'heart' : 'heart-outline'} size={iconSize} color={liked ? Colors.heart : Colors.black} />
          <Text adjustsFontSizeToFit style={[styles.textWrapper, { color: liked ? Colors.heart : liked === false ? Colors.som : Colors.black }]}>{likes}</Text>
        </BouncyButton>
      </AuthActionGuard>
      <Divider orientation='vertical' width={1} color={Colors.black} />
      <AuthActionGuard onUnAuth={onUnAuth}>
        <BouncyButton scaleTo={0.8} onPress={onDislikeHandle} style={styles.buttonWrapper}>
          <AIcon name={liked === false ? 'dislike1' : 'dislike2'} size={iconSize} color={liked === false ? Colors.som : Colors.black} />
        </BouncyButton>
      </AuthActionGuard>
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
