import { StyleSheet, View } from 'react-native'
import React from 'react'
import NotesPyramidRow from './NotesPyramidRow'
import { Divider } from 'react-native-paper'
import { type NoteLayer } from '@/src/generated/graphql'
import { type CardFragranceNote } from './FragranceNoteCard'

export interface NotesPyramidLayer {
  layer: NoteLayer
  notes: CardFragranceNote[]
}

export interface NotesPyramidProps {
  layers: NotesPyramidLayer[]
}

const NotesPyramid = (props: NotesPyramidProps) => {
  const { layers } = props

  return (
    <View style={styles.wrapper}>
      {layers.map((item, index) => (
        <React.Fragment key={item.layer}>
          <NotesPyramidRow
            notes={item.notes}
            layer={item.layer}
          />
          {index < layers.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </View>
  )
}

export default NotesPyramid

const styles = StyleSheet.create({
  wrapper: {
    gap: 10
  },
  heading: {
    flex: 1,
    textAlign: 'left',
    width: '100%',
    opacity: 0.8,
    marginBottom: 5
  }
})
