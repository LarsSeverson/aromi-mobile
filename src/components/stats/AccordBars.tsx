import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FragranceAccords } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import LinearScaleBar from './LinearScaleBar'
import { Text } from 'react-native-paper'

export interface AccordBarsProps {
  accords: FragranceAccords | undefined
}

const AccordBars: React.FC<AccordBarsProps> = (props: AccordBarsProps) => {
  const { accords } = props

  if (!accords || !accords.length) return null

  return (
    <View style={{ gap: 10 }}>
      {accords.map((accord, index) => (
        <View key={index}>
          <Text style={{ marginHorizontal: 10 }}>{accord.name}</Text>
          <LinearScaleBar key={index} value={0} />
        </View>
      ))}
    </View>
  )
}

export default AccordBars

const styles = StyleSheet.create({})
