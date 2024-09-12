import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import { Colors } from '@/src/constants/Colors'
import BlockButton from '../Misc/BlockButton'
import FragranceBlockLoading from './Utils/FragranceBlockLoading'

const FragranceBlockHorizontalBar: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const loading = props.loading
  const error = props.error

  if (loading || error) {
    return (
      <View style={styles.wrapper}>
        <FragranceBlockLoading />
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
