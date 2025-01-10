import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import BouncyButton from '../../utils/BouncyButton'
import { Colors } from '@/src/constants/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import BlockLikeDislike from '../utils/BlockLikeDislike'
import AromiImage from '../../utils/AromiImage'
import { Text } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'

const FragranceBlockVerticalCard: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const { fragrance, onPress } = props
  const theme = useAppTheme()

  if (!fragrance) {
    return (
      null
    )
  }

  const previewURL = fragrance?.images?.length ? fragrance?.images[0].s3Key : undefined

  return (
    <View style={styles.wrapper}>
      <BouncyButton style={styles.wrapper} onPress={onPress}>
        <AromiImage path={previewURL} style={styles.contentWrapper}>
          <BlockLikeDislike numLikes={fragrance?.likes} numDislikes={fragrance?.dislikes} style={styles.contentLikeDislikeWrapper} />
        </AromiImage>
      </BouncyButton>
      <View style={styles.bottomWrapper}>
        <View style={styles.bottomTop}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{ opacity: 0.95, flex: 1 }}>{fragrance?.name}</Text>
          <View style={styles.blockOptionsWrapper}>
            <BouncyButton scaleTo={0.8}>
              <Icon name='more-horiz' size={20} color={theme.colors.icon} />
            </BouncyButton>
          </View>
        </View>
        <Text
          variant='labelSmall'
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{ opacity: 0.9 }}
        >
          {fragrance?.brand}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  contentWrapper: {
    flex: 1,
    zIndex: 0,
    borderRadius: 20,
    backgroundColor: Colors.placeholder,
    aspectRatio: 1,
    overflow: 'hidden',
    position: 'relative'
  },
  contentLikeDislikeWrapper: {
    zIndex: 2,
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  bottomWrapper: {
    paddingLeft: 10,
    paddingRight: 10
  },
  bottomTop: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
  blockOptionsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto'
  }
})

export default FragranceBlockVerticalCard
