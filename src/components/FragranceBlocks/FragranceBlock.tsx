import React, { Component } from 'react'
import FragranceBlockHorizontalCard from './FragranceBlockHorizontalCard'
import FragranceBlockHorizontalBar from './FragranceBlockHorizontalBars'
import FragranceBlockVerticalCard from './FragranceBlockVerticalCard'
import { ApolloError } from '@apollo/client'

enum FragranceBlockTypes {
  VerticalCard = 0,

  HorizontalCard,
  HorizontalBar
}

interface FragranceBlockProps {
  type: FragranceBlockTypes
  loading: boolean
  error: ApolloError | undefined
}

const FragranceBlockComponentMap: Record<FragranceBlockTypes, React.FC<FragranceBlockProps>> = {
  [FragranceBlockTypes.VerticalCard]: FragranceBlockVerticalCard,
  [FragranceBlockTypes.HorizontalCard]: FragranceBlockHorizontalCard,
  [FragranceBlockTypes.HorizontalBar]: FragranceBlockHorizontalBar
}

const FragranceBlock: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const Component = FragranceBlockComponentMap[props.type]
  return <Component {...props} />
}

export { FragranceBlock, FragranceBlockTypes, FragranceBlockProps }
