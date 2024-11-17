import { View, StyleSheet } from 'react-native'
import React from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import { Colors } from '@/src/constants/Colors'
import BouncyButton from '../../utils/BouncyButton'
import styled from 'styled-components/native'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import FragranceBlockHorizontalCardLoading from './utils/FragranceBlockHorizontalCardLoading'

const Name = styled.Text`
  font-family: 'PalanquinDark-Medium';
  font-size: 12px;
  color: ${Colors.black};
`

const FragranceBlockHorizontalCard: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const fragrance = props.fragrance as Fragrance

  if (!fragrance) {
    return (
      <FragranceBlockHorizontalCardLoading />
    )
  }

  return (
    <View style={styles.wrapper}>
      <BouncyButton style={styles.wrapper}>
        <View style={styles.imageBackground} />
      </BouncyButton>
      <View style={styles.bottomWrapper}>
        <Name numberOfLines={1} ellipsizeMode='tail'>{fragrance.name}</Name>
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
  imageBackground: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: Colors.black,
    opacity: 0.1,
    height: 150,
    width: 150,
    maxWidth: 150
  },
  bottomWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    maxWidth: 150
  }
})

export default FragranceBlockHorizontalCard
