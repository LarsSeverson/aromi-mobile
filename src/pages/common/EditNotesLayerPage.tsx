import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import SelectableList, { type SelectableRenderItemProps } from '@/src/components/common/SelectableList'
import FeedbackButton from '@/src/components/common/FeedbackButton'
import { ActivityIndicator, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import FragranceNoteCard, { type CardFragranceNote } from '@/src/components/common/fragrance/FragranceNoteCard'
import { type NoteLayer } from '@/src/generated/graphql'
import useVoteOnNote from '@/src/hooks/useVoteOnNote'
import useFragranceNotesLayer from '@/src/hooks/useFragranceNotesLayer'

const EditNotesLayerPage = () => {
  const nav = useNavigation()
  const { fragranceId, layer } = useLocalSearchParams<{ fragranceId: string, layer: NoteLayer }>()
  const parsedFragranceId = Number(fragranceId)

  const { data, pageInfo, loading, getMore } = useFragranceNotesLayer(parsedFragranceId, layer)
  const { voteOnNote } = useVoteOnNote()

  const getMoreNotes = useCallback(() => {
    if (!loading) {
      getMore()
    }
  }, [loading, getMore])

  const isNoteSelected = useCallback((note: CardFragranceNote) => {
    return note.myVote ?? false
  }, [])

  const onNoteSelected = useCallback((_: number, fragranceNote: CardFragranceNote, myVote: boolean) => {
    const { noteId, layer } = fragranceNote

    voteOnNote({
      fragranceId: parsedFragranceId,
      noteId,
      layer,
      myVote
    }, fragranceNote)
  }, [parsedFragranceId, voteOnNote])

  const onRenderNote = useCallback(({ item: note, selected }: SelectableRenderItemProps<CardFragranceNote>) => {
    if (note == null) return null

    return (
      <FragranceNoteCard
        note={note}
        selected={selected}
        showVotes
      />
    )
  }, [])

  const onRenderListFooter = useCallback(() => {
    return (
      <View>
        {loading && <ActivityIndicator />}
        {!(pageInfo?.hasNextPage ?? true) && <Text style={{ alignSelf: 'center' }}>End of notes</Text>}
        {!(pageInfo?.hasNextPage ?? true) && <FeedbackButton />}
      </View>
    )
  }, [pageInfo?.hasNextPage, loading])

  useEffect(() => {
    nav.setOptions({ headerTitle: `${layer} notes` })
  }, [nav, layer])

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      <SelectableList
        data={data}
        numColumns={3}
        onEndReachedThreshold={0.5}
        renderItemStyle={{ width: '33.33%' }}
        style={styles.listWrapper}
        isSelected={isNoteSelected}
        onRenderItem={onRenderNote}
        onItemSelected={onNoteSelected}
        onEndReached={getMoreNotes}
        ListFooterComponent={onRenderListFooter}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  listWrapper: {
    padding: 5
  }
})

export default EditNotesLayerPage
