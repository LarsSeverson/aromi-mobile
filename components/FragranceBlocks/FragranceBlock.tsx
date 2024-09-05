import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Colors } from '@/constants/Colors'
import FragranceBlockHorizontalCards from './FragranceBlockHorizontalCards'

enum FragranceBlockTypes {
  Default = 0,

  HorizontalCards
}

interface FragranceBlockProps {
  type: FragranceBlockTypes | FragranceBlockTypes.Default
}

const FragranceBlockDefault: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageBackground} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: 200,
    height: 200
  },
  imageBackground: {
    flex: 1,
    backgroundColor: Colors.black,
    opacity: 0.05,
    borderRadius: 20
  }
})

const FragranceBlockComponentMap: Record<FragranceBlockTypes, React.FC<FragranceBlockProps>> = {
  [FragranceBlockTypes.Default]: FragranceBlockDefault,
  [FragranceBlockTypes.HorizontalCards]: FragranceBlockHorizontalCards
}

const FragranceBlock: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const Component = FragranceBlockComponentMap[props.type]
  return <Component {...props} />
}

export { FragranceBlock, FragranceBlockTypes, FragranceBlockProps }
