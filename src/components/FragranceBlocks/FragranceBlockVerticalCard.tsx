import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import BlockButton from '../Misc/BlockButton'
import FragranceBlockVerticalCardLoading from './Utils/FragranceBlockVerticalCardLoading'
import { Fragrance } from '@/aromi-backend/src/types/fragrance'
import { Colors } from '@/src/constants/Colors'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LikeDislike from '../Misc/LikeDislike'

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

  if (!fragrance) {
    return (
      <FragranceBlockVerticalCardLoading />
    )
  }

  return (
    <View style={styles.wrapper}>
      <BlockButton style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <LikeDislike numLikes={fragrance.likes} numDislikes={fragrance.dislikes} style={styles.contentLikeDislikeWrapper} />
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
