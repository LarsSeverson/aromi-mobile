import { GestureResponderEvent, StyleSheet } from 'react-native'
import React from 'react'
import HomeBlockVerticalCards from './HomeBlockVerticalCards'
import HomeBlockHorizontalCards from './HomeBlockHorizontalCards'

enum HomeBlockTypes {
  VerticalCards = 0,
  HorizontalCards,
}

interface HomeBlockProps {
  type: HomeBlockTypes
  title: string
  data: any // TODO: Define the array
  onSeeAll: (event: GestureResponderEvent) => void | undefined

  numColumns?: number
  numRows?: number

  previewLength?: number
}

const HomeBlockComponentMap: Record<HomeBlockTypes, React.FC<HomeBlockProps>> = {
  [HomeBlockTypes.VerticalCards]: HomeBlockVerticalCards,
  [HomeBlockTypes.HorizontalCards]: HomeBlockHorizontalCards
}

const HomeBlock: React.FC<HomeBlockProps> = (props: HomeBlockProps) => {
  const Component = HomeBlockComponentMap[props.type]
  return <Component {...props} />
}

export { HomeBlock, HomeBlockTypes, HomeBlockProps }
