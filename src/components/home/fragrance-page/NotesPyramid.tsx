import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FragranceNotes, NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import FragranceEmpty from './FragranceEmpty'
import NotesPyramidRow from './NotesPyramidRow'
import { Divider } from 'react-native-paper'

export interface NotesPyramidProps {
  notes: FragranceNotes
}

const NotesPyramid: React.FC<NotesPyramidProps> = (props: NotesPyramidProps) => {
  const { notes } = props

  const layers = [
    { layer: NoteLayerType.TOP, notes: notes.top },
    { layer: NoteLayerType.MIDDLE, notes: notes.middle },
    { layer: NoteLayerType.BASE, notes: notes.base }
  ].filter(item => item.notes.length > 0)

  if (!layers.length) {
    return <FragranceEmpty headline='No notes yet' />
  }

  return (
    <View style={styles.wrapper}>
      {layers.map((item, index) => (
        <React.Fragment key={item.layer}>
          <NotesPyramidRow notes={item.notes} layer={item.layer} />
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
