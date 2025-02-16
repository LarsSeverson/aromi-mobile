import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import SelectableList, { SelectableRenderItemProps } from '@/src/components/SelectableList'
import { FragranceNote, NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import SelectableNote from '@/src/components/home/fragrance-page/SelectableNote'
import FeedbackButton from '@/src/components/FeedbackButton'
import { ActivityIndicator, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/src/components/SearchInput'

const DEFAULT_LIMIT = 30

const EditNotesLayerPage = () => {
  const nav = useNavigation()
  const fragranceId = Number(useLocalSearchParams().fragranceId)
  const layer = useLocalSearchParams().layer as NoteLayerType

  const localSearchTerm = useRef('')

  const {
    notes,
    loading,
    errors,
    hasMore,
    getMore,
    voteOnNote
  } = useFragranceNotes({ id: fragranceId, layers: [layer], fill: true, limit: DEFAULT_LIMIT })

  const handleSearch = useCallback((newSearchTerm: string) => {
    localSearchTerm.current = newSearchTerm
  }, [])

  const getMoreNotes = useCallback(() => {
    !loading.notesLoading && getMore()
  }, [loading.notesLoading, getMore])

  const isNoteSelected = useCallback((note: FragranceNote) => {
    return note.myVote
  }, [])

  const onNoteSelected = useCallback((_: number, fragranceNote: FragranceNote, myVote: boolean) => {
    voteOnNote({
      fragranceId,
      noteId: fragranceNote.noteId,
      layer: fragranceNote.layer,
      myVote
    }, fragranceNote)
  }, [fragranceId, voteOnNote])

  const onRenderNote = useCallback(({ item, index, selected }: SelectableRenderItemProps<FragranceNote>) => {
    if (!item) return null

    const originallySelected = item.myVote

    return <SelectableNote item={item} index={index} selected={selected} originallySelected={originallySelected} />
  }, [])

  const onRenderListFooter = useCallback(() => {
    return (
      <View>
        {loading.notesLoading && <ActivityIndicator />}
        {!hasMore && <Text style={{ alignSelf: 'center' }}>End of notes</Text>}
        {!hasMore && <FeedbackButton />}
      </View>
    )
  }, [hasMore, loading.notesLoading])

  useEffect(() => {
    nav.setOptions({ headerTitle: `${layer} notes` })
  }, [nav, layer])

  if (!notes) return null

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      {/* <SearchInput onSearch={handleSearch} /> */}

      <SelectableList
        data={notes[layer]}
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
