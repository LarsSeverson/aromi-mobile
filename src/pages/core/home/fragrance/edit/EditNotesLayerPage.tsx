import { View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import { FragranceNote, NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import SelectableList, { SelectableRenderItemProps } from '@/src/components/utils/SelectableList'
import { useAppTheme } from '@/src/constants/Themes'
import NotesLayerNote from '@/src/components/fragrance/NotesLayerNote'
import FeedbackButton from '@/src/components/utils/FeedbackButton'
import { ActivityIndicator, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/src/components/utils/SearchInput'
import SubmitButton from '@/src/components/utils/SubmitButton'

const EditNotesLayerPage = () => {
  const nav = useNavigation()
  const theme = useAppTheme()

  const fragranceId = Number(useLocalSearchParams().fragranceId)
  const layer = useLocalSearchParams().layer as NoteLayer

  const selectedNotes = useRef(new Map<number, FragranceNote>())
  const localSearchTerm = useRef('')

  const params = useMemo(() => ({ id: fragranceId, layer, fill: true, limit: 30 }), [fragranceId, layer])

  // const [selectedNotesCount, setSelectedNotesCount] = useState(selectedNotes.current.size)

  const {
    notes,
    loading,
    error,
    noResults,
    hasMore,
    refresh,
    search,
    getMore
  } = useFragranceNotes(params)

  const searchNotes = useCallback(search, [search])
  const getMoreNotes = useCallback(() => { !loading && hasMore && getMore() }, [getMore, hasMore, loading])

  const onNoteSelected = useCallback((id: number, note: FragranceNote) => {
    selectedNotes.current.has(id)
      ? selectedNotes.current.delete(id)
      : selectedNotes.current.set(id, note)

    // setSelectedNotesCount(selectedNotes.current.size)
  }, [])

  const onRenderNote = useCallback(({ item, index, selected }: SelectableRenderItemProps<FragranceNote>) => {
    return <NotesLayerNote item={item} index={index} selected={selected} />
  }, [])

  const onRenderListFooter = useCallback(() => {
    return (
      <View>
        {loading && <ActivityIndicator />}
        {!hasMore && <Text style={{ alignSelf: 'center' }}>End of notes</Text>}
        {!noResults && !hasMore && <FeedbackButton />}
      </View>
    )
  }, [hasMore, loading, noResults])

  useEffect(() => {
    nav.setOptions({ headerTitle: `${layer} notes` })
  }, [nav, layer])

  const handleSearch = (newSearchTerm: string) => {
    localSearchTerm.current = newSearchTerm
    searchNotes(newSearchTerm)
  }

  if (!notes) {
    return null
  }

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <SearchInput style={{ paddingHorizontal: 5 }} onSearch={handleSearch} />
      <SelectableList
        data={notes}
        numColumns={3}
        onEndReachedThreshold={0.5}
        selectedItems={selectedNotes.current}
        renderItemStyle={{ width: '33.33%' }}
        renderItem={onRenderNote}
        onEndReached={getMoreNotes}
        ListFooterComponent={onRenderListFooter}
        onItemSelected={onNoteSelected}
      />
    </SafeAreaView>
  )
}

export default EditNotesLayerPage
