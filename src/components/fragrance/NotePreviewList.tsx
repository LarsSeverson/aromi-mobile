import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FragranceNote, FragranceNotes } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import BouncyButton from '../utils/BouncyButton'
import { FlatList } from 'react-native-gesture-handler'
import NotePreview from './NotePreview'

export interface NotePreviewListProps {
  notes: FragranceNotes
}

const NotePreviewList: React.FC<NotePreviewListProps> = (props: NotePreviewListProps) => {
  const { notes } = props

  if (!notes || !notes.length) {
    return (
      <NotePreview empty />
    )
  }

  return (
    <FlatList
      data={notes}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: note }: ListRenderItemInfo<FragranceNote> | any) => <NotePreview />}
      contentContainerStyle={{ gap: 10 }}
      style={{ overflow: 'visible' }}
    />
  )
}

export default NotePreviewList

const styles = StyleSheet.create({
  wrapper: {
    gap: 10
  }
})
