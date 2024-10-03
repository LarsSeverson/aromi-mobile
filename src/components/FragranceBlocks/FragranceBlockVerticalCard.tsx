import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import BlockButton from '../Misc/BlockButton'
import FragranceBlockVerticalCardLoading from './Utils/FragranceBlockVerticalCardLoading'
import { Fragrance } from '@/aromi-backend/src/types/fragrance'
import { Colors } from '@/src/constants/Colors'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AIcon from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'

const Name = styled.Text`
  font-family: 'PalanquinDark-Medium';
  font-size: small;
  color: ${Colors.black};
  flex: 1;
`

const Brand = styled.Text`
  font-family: 'Palanquin-SemiBold';
  font-size: 11px;
  color: ${Colors.black};
  margin-bottom: 12px;
  margin-top: -5px;
`

const FragranceBlockVerticalCard: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const fragrance = props.fragrance as Fragrance

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  if (!fragrance) {
    return (
      <FragranceBlockVerticalCardLoading />
    )
  }

  const likePressed = () => {
    setLiked(!liked)
    setDisliked(false)
  }

  const dislikePressed = () => {
    setDisliked(!disliked)
    setLiked(false)
  }

  return (
    <View style={styles.wrapper}>
      <BlockButton style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <View style={styles.imageOverlay}>
            <LinearGradient colors={['transparent', Colors.black]} start={{ x: 0, y: 0.7 }} end={{ x: 0, y: 1.5 }} style={{ flex: 1 }} />
          </View>
          <BlockButton scaleTo={0.8} onPress={dislikePressed} style={[styles.contentIcon, { bottom: 10, left: 10 }]}>
            <AIcon name={disliked ? 'dislike1' : 'dislike2'} size={23} color={disliked ? Colors.black : Colors.white} />
          </BlockButton>
          <BlockButton scaleTo={0.8} onPress={likePressed} style={[styles.contentIcon, { bottom: 10, right: 10 }]}>
            <CIcon name={liked ? 'heart' : 'heart-outline'} size={25} color={liked ? Colors.heart : Colors.white} />
          </BlockButton>
        </View>
      </BlockButton>
      <View style={styles.bottomWrapper}>
        <View style={styles.bottomTop}>
          <Name numberOfLines={1} ellipsizeMode='tail'>{fragrance.name}</Name>
          <View style={styles.blockOptionsWrapper}>
            <BlockButton scaleTo={0.8}>
              <Icon name='more-horiz' size={20} color={Colors.black} />
            </BlockButton>
          </View>
        </View>
        <Brand numberOfLines={1} ellipsizeMode='tail'>{fragrance.brand}</Brand>
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
    height: 200,
    overflow: 'hidden',
    position: 'relative'
  },
  imageOverlay: {
    flex: 1,
    zIndex: 1,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4
    },
    opacity: 0.5,
    shadowRadius: 4
  },
  contentIcon: {
    zIndex: 3,
    position: 'absolute'
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
