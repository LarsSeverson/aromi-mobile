import { ListRenderItemInfo, StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { FragranceNote, FragranceNotes } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import NotePreview from './NotePreview'
import { Divider } from 'react-native-paper'

export interface NotesPyramidProps {
  topNotes: FragranceNotes
  middleNotes: FragranceNotes
  baseNotes: FragranceNotes
}

const NotesPyramid: React.FC<NotesPyramidProps> = (props: NotesPyramidProps) => {
  const { topNotes, middleNotes, baseNotes } = props

  if (!topNotes.length && !middleNotes.length && !baseNotes.length) {
    return null
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', overflow: 'hidden', gap: 10 }}>
      <FlatList
        data={topNotes}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: note }: ListRenderItemInfo<FragranceNote> | any) => <NotePreview />}
        contentContainerStyle={{ gap: 10 }}
        style={{ overflow: 'visible' }}
      />

      <Divider style={{ width: '100%' }} />

      <FlatList
        data={middleNotes}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: note }: ListRenderItemInfo<FragranceNote> | any) => <NotePreview />}
        contentContainerStyle={{ gap: 10 }}
        style={{ overflow: 'visible' }}
      />

      <Divider style={{ width: '100%' }} />

      <FlatList
        data={baseNotes}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: note }: ListRenderItemInfo<FragranceNote> | any) => <NotePreview />}
        contentContainerStyle={{ gap: 10 }}
        style={{ overflow: 'visible' }}
      />

    </View>
  )
}

export default NotesPyramid

const styles = StyleSheet.create({})
