import { View } from 'react-native'
import React, { useCallback } from 'react'
import LinearScaleBar from '../../stats/LinearScaleBar'
import { Text } from 'react-native-paper'
import FragranceEmpty from './FragranceEmpty'
import { FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export interface AccordBarsProps {
  accords: FragranceAccord[]
  maxVote: number
}

const AccordsLadder: React.FC<AccordBarsProps> = (props: AccordBarsProps) => {
  const { accords, maxVote } = props

  const getWidth = useCallback((votes: number) => {
    return votes / maxVote * 100
  }, [maxVote])

  return (
    <View style={{ gap: 10 }}>

      {!(accords.length) && <FragranceEmpty headline='No accords yet' />}

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
