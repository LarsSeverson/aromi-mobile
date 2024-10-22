import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import BouncyButton from '../../Utils/BouncyButton'
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
    <BouncyButton>
      <View style={styles.wrapper} />
    </BouncyButton>
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
