import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import { Colors } from '@/constants/Colors'

const FragranceBlockHorizontalCards: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageBackground} />
    </View>
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
    backgroundColor: Colors.black,
    opacity: 0.05,
    borderRadius: 20
  }
})

export default FragranceBlockHorizontalCards
