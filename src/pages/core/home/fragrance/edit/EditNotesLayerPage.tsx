import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import { FragranceNote, NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import SelectableList, { SelectableRenderItemProps } from '@/src/components/utils/SelectableList'
import NotesLayerNote from '@/src/components/fragrance/NotesLayerNote'
import FeedbackButton from '@/src/components/utils/FeedbackButton'
import { ActivityIndicator, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/src/components/utils/SearchInput'

const EditNotesLayerPage = () => {
  const nav = useNavigation()
  const fragranceId = Number(useLocalSearchParams().fragranceId)
  const layer = useLocalSearchParams().layer as NoteLayer

  const localSearchTerm = useRef('')

  const {
    notes,
    votes,

    loading,
    error,

    noResults,
    hasMore,

    searchByName,
    getMore,
    vote,
    refresh
  } = useFragranceNotes({ fragranceId, layer, fill: true })

  const searchNotes = useCallback(searchByName, [searchByName])

  const getMoreNotes = useCallback(() => {
    if (!loading.notes && !loading.votes) {
      hasMore && getMore()
    }
  }, [loading, hasMore, getMore])

  const handleSearch = useCallback((newSearchTerm: string) => {
    localSearchTerm.current = newSearchTerm

    searchNotes(newSearchTerm)
  }, [searchNotes])

  const onRenderNote = useCallback(({ item, index, selected }: SelectableRenderItemProps<FragranceNote>) => {
    const originallySelected = (item && votes?.has(item.id)) || false

    return <NotesLayerNote item={item} index={index} selected={selected} originallySelected={originallySelected} />
  }, [votes])

  const onRenderListFooter = useCallback(() => {
    return (
      <View>
        {(loading.notes || loading.votes) && <ActivityIndicator />}
        {!hasMore && <Text style={{ alignSelf: 'center' }}>End of notes</Text>}
        {!noResults && !hasMore && <FeedbackButton />}
      </View>
    )
  }, [hasMore, loading, noResults])

  useEffect(() => {
    nav.setOptions({ headerTitle: `${layer} notes` })
  }, [nav, layer])

  if (!notes || !votes) return null

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <SearchInput onSearch={handleSearch} />

      <SelectableList
        data={notes}
        numColumns={3}
        onEndReachedThreshold={0.5}
        selectedItems={votes}
        renderItemStyle={{ width: '33.33%' }}
        style={styles.listWrapper}
        renderItem={onRenderNote}
        onItemSelected={vote}
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
