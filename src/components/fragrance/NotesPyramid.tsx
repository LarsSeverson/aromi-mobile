import { ListRenderItemInfo, StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { FragranceNote, FragranceNotes } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import NotePreview from './NotePreview'
import { Divider } from 'react-native-paper'

export interface NotesPyramidProps {
  notes: FragranceNotes | undefined
}

const NotesPyramid: React.FC<NotesPyramidProps> = (props: NotesPyramidProps) => {
  const { notes } = props

  if (!notes?.length) {
    return null
  }

  const topNotes = notes.filter(note => note.type === 'Top Notes')
  const middleNotes = notes.filter(note => note.type === 'Middle Notes')
  const baseNotes = notes.filter(note => note.type === 'Base Notes')

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', overflow: 'hidden', gap: 10 }}>
      <FlatList
        data={topNotes}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: note }: ListRenderItemInfo<FragranceNote> | any) => <NotePreview note={note} />}
        contentContainerStyle={{ gap: 20 }}
        style={{ overflow: 'visible' }}
      />

      {!topNotes.length && <NotePreview empty />}

      <Divider style={{ width: '100%' }} />

      <FlatList
        data={middleNotes}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: note }: ListRenderItemInfo<FragranceNote> | any) => <NotePreview note={note} />}
        contentContainerStyle={{ gap: 20 }}
        style={{ overflow: 'visible' }}
      />

      {!middleNotes.length && <NotePreview empty />}

      <Divider style={{ width: '100%' }} />

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
  )
}

export default NotesPyramid

const styles = StyleSheet.create({})
