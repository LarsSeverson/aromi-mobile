import { View } from 'react-native'
import React, { useCallback } from 'react'
import LinearScaleBar from '../../common/LinearScaleBar'
import { Text } from 'react-native-paper'
import FragranceEmpty from './FragranceEmpty'
import { type CardFragranceAccord } from './FragranceAccordCard'

export interface AccordBarsProps {
  accords: CardFragranceAccord[]
  maxVote: number
}

const AccordsLadder = (props: AccordBarsProps) => {
  const { accords, maxVote } = props

  const getWidth = useCallback((votes: number) => {
    return votes / maxVote * 100
  }, [maxVote])

  return (
    <View style={{ gap: 10 }}>

      {(accords.length === 0) && <FragranceEmpty headline='No accords yet' />}

      {accords.map((accord, index) => {
        return (
          <View key={index}>
            <Text style={{ marginHorizontal: 10 }}>{accord.name}</Text>
            <LinearScaleBar key={index} value={getWidth(accord.votes)} color={accord.color} />
          </View>
        )
      })}
    </View>
  )
}

export default AccordsLadder
