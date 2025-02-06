import { ListRenderItemInfo, StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { FragranceNote, FragranceNotes, NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import NotePreview from './NotePreview'
import { Divider, Text } from 'react-native-paper'
import FragranceEmpty from './FragranceEmpty'

export interface NotesPyramidProps {
  notes: FragranceNotes
}

const NotesPyramid: React.FC<NotesPyramidProps> = (props: NotesPyramidProps) => {
  const { notes } = props

  const topNotes = notes.filter(note => note.layer === NoteLayerType.TOP)
  const middleNotes = notes.filter(note => note.layer === NoteLayerType.MIDDLE)
  const baseNotes = notes.filter(note => note.layer === NoteLayerType.BASE)

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', overflow: 'hidden', gap: 10 }}>

      {!(topNotes.length || middleNotes.length || baseNotes.length) && <FragranceEmpty headline='No notes yet' />}

      {topNotes.length > 0 && (
        <>
          <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ flex: 1, textAlign: 'left', width: '100%', opacity: 0.8, marginBottom: 5 }}>top</Text>
            <FlatList
              data={topNotes}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item: note }: ListRenderItemInfo<FragranceNote> | any) => <NotePreview note={note} />}
              contentContainerStyle={{ gap: 20 }}
              style={{ overflow: 'visible' }}
            />
          </View>

          <Divider style={{ width: '100%' }} />
        </>
      )}

      {middleNotes.length > 0 && (
        <>
          <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ flex: 1, textAlign: 'left', width: '100%', opacity: 0.8, marginBottom: 5 }}>middle</Text>
            <FlatList
              data={middleNotes}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item: note }: ListRenderItemInfo<FragranceNote> | any) => <NotePreview note={note} />}
              contentContainerStyle={{ gap: 20 }}
              style={{ overflow: 'visible' }}
            />
          </View>

          <Divider style={{ width: '100%' }} />
        </>
      )}

      {baseNotes.length > 0 && (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ flex: 1, width: '100%', opacity: 0.8, marginBottom: 5 }}>base</Text>
          <FlatList
            data={baseNotes}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: note }: ListRenderItemInfo<FragranceNote> | any) => <NotePreview note={note} />}
            contentContainerStyle={{ gap: 20 }}
            style={{ overflow: 'visible' }}
          />

          {!baseNotes.length && <NotePreview empty />}
        </View>
      )}
    </View>
  )
}

export default NotesPyramid

const styles = StyleSheet.create({})
