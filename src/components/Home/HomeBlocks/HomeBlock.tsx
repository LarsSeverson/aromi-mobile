import { GestureResponderEvent } from 'react-native'
import React from 'react'
import HomeBlockVerticalCards from './HomeBlockVerticalCards'
import HomeBlockHorizontalCards from './HomeBlockHorizontalCards'
import HomeBlockHorizontalBars from './HomeBlockHorizontalBars'

enum HomeBlockTypes {
  VerticalCards = 0,
  HorizontalCards,

  HorizontalBars
}

interface HomeBlockProps {
  type: HomeBlockTypes
  title: string
  data: any[]
  onSeeAll: (event: GestureResponderEvent) => void | undefined

  numColumns?: number
  numRows?: number

  previewLength?: number
}

const HomeBlockComponentMap: Record<HomeBlockTypes, React.FC<HomeBlockProps>> = {
  [HomeBlockTypes.VerticalCards]: HomeBlockVerticalCards,
  [HomeBlockTypes.HorizontalCards]: HomeBlockHorizontalCards,
  [HomeBlockTypes.HorizontalBars]: HomeBlockHorizontalBars
}

const HomeBlock: React.FC<HomeBlockProps> = (props: HomeBlockProps) => {
  const Component = HomeBlockComponentMap[props.type]
  return <Component {...props} />
}

export { HomeBlock, HomeBlockTypes, HomeBlockProps }
