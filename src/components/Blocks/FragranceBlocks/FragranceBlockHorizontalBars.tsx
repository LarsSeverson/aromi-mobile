import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import BlockButton from '../Utils/BlockButton'
import FragranceBlockVerticalCardLoading from './Utils/FragranceBlockVerticalCardLoading'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'

const FragranceBlockHorizontalBar: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const fragrance = props.fragrance as Fragrance

  if (!fragrance) {
    return (
      <View style={styles.wrapper}>
        <FragranceBlockVerticalCardLoading />
      </View>
    )
  }

  return (
    <BlockButton>
      <View style={styles.wrapper} />
    </BlockButton>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: 300,
    height: 70,
    borderRadius: 10
  }
})

export default FragranceBlockHorizontalBar
