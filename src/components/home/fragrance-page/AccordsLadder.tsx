import { StyleSheet, View } from 'react-native'
import React from 'react'
import LinearScaleBar from '../../stats/LinearScaleBar'
import { Text } from 'react-native-paper'
import FragranceEmpty from './FragranceEmpty'
import { FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export interface AccordBarsProps {
  accords: FragranceAccord[]
}

const AccordsLadder: React.FC<AccordBarsProps> = (props: AccordBarsProps) => {
  const { accords } = props

  const maxVotes = accords?.[0]?.votes || 0

  return (
    <View style={{ gap: 10 }}>

      {!(accords.length) && <FragranceEmpty headline='No accords yet' />}

      {accords.map((accord, index) => {
        const width = (accord.votes / maxVotes * 100)

        return (
          <View key={index}>
            <Text style={{ marginHorizontal: 10 }}>{accord.name}</Text>
            <LinearScaleBar key={index} value={width} color={accord.color} />
          </View>
        )
      })}
    </View>
  )
}

export default AccordsLadder

const styles = StyleSheet.create({})
