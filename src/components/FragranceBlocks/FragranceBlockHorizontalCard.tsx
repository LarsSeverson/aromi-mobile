import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import { Colors } from '@/src/constants/Colors'
import BlockButton from '../Misc/BlockButton'
import FragranceBlockLoading from './Utils/FragranceBlockLoading'

const FragranceBlockHorizontalCard: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const loading = props.loading
  const error = props.error

  if (loading || error) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.imageBackground}>
          <FragranceBlockLoading />
        </View>
      </View>
    )
  }

  return (
    <BlockButton>
      <View style={styles.wrapper}>
        <View style={styles.imageBackground} />
      </View>
    </BlockButton>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: 150,
    height: 150
  },
  imageBackground: {
    flex: 1,
    borderRadius: 20
  }
})

export default FragranceBlockHorizontalCard
