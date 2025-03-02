import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import SelectableList, { type SelectableRenderItemProps } from '@/src/components/common/SelectableList'
import FeedbackButton from '@/src/components/common/FeedbackButton'
import { ActivityIndicator, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import FragranceNoteCard, { type CardFragranceNote } from '@/src/components/common/fragrance/FragranceNoteCard'
import { NoteLayer } from '@/src/generated/graphql'
import useVoteOnNote from '@/src/hooks/useVoteOnNote'

const DEFAULT_LIMIT = 30

const EditNotesLayerPage = () => {
  const nav = useNavigation()
  const fragranceId = Number(useLocalSearchParams().fragranceId)
  const layer = useLocalSearchParams().layer as NoteLayer

  const {
    notes,
    loading,
    hasMore,
    getMore
  } = useFragranceNotes({
    id: fragranceId,
    includeBase: layer === NoteLayer.Base,
    includeMiddle: layer === NoteLayer.Middle,
    includeTop: layer === NoteLayer.Top,
    fill: true,
    limit: DEFAULT_LIMIT
  })

  const { voteOnNote } = useVoteOnNote()

  // const handleSearch = useCallback((newSearchTerm: string) => {
  //   localSearchTerm.current = newSearchTerm
  // }, [])

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
      fragranceId,
      noteId,
      layer,
      myVote
    }, fragranceNote)
  }, [fragranceId, voteOnNote])

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
        {!hasMore && <Text style={{ alignSelf: 'center' }}>End of notes</Text>}
        {!hasMore && <FeedbackButton />}
      </View>
    )
  }, [hasMore, loading])

  useEffect(() => {
    nav.setOptions({ headerTitle: `${layer} notes` })
  }, [nav, layer])

  if (notes == null) return null

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      {/* <SearchInput onSearch={handleSearch} /> */}

      <SelectableList
        data={notes[layer] ?? []}
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
