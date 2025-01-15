import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { selectedNotesState } from '@/src/components/fragrance/utils/SelectedNotes'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import { FragranceNote, NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import SelectableList, { SelectableRenderItemProps } from '@/src/components/utils/SelectableList'
import { useAppTheme } from '@/src/constants/Themes'
import NotesLayerNote from '@/src/components/fragrance/NotesLayerNote'
import FeedbackButton from '@/src/components/utils/FeedbackButton'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/src/components/utils/SearchInput'

const EditNotesLayerPage = () => {
  const fragranceId = Number(useLocalSearchParams().fragranceId)
  const layer = useLocalSearchParams().layer as NoteLayer
  const nav = useNavigation()
  const theme = useAppTheme()
  const selectedNotes = useRef(new Map<number, FragranceNote>())
  const localSearchTerm = useRef('')
  const params = useMemo(() => ({ id: fragranceId, layer, fill: true, limit: 30 }), [fragranceId, layer])
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

  const handleSearch = (newSearchTerm: string) => {
    localSearchTerm.current = newSearchTerm
    searchNotes(newSearchTerm)
  }

  const renderNoteItem = useCallback(({ item, index, selected }: SelectableRenderItemProps<FragranceNote>) => {
    return <NotesLayerNote item={item} index={index} selected={selected} />
  }, [])

  const onRenderListFooter = useCallback(() => {
    return (
      <View>
        {loading && <ActivityIndicator />}
        {!noResults && !hasMore && <FeedbackButton />}
      </View>
    )
  }, [hasMore, loading, noResults])

  useEffect(() => {
    nav.setOptions({ headerTitle: `${layer} notes` })
  }, [nav, layer])

  if (!notes) {
    return null
  }

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <SearchInput style={{ paddingHorizontal: 5 }} onSearch={handleSearch} />
      <SelectableList
        data={notes}
        numColumns={3}
        renderItemStyle={{ width: '33.33%' }}
        renderItem={renderNoteItem}
        onEndReached={getMoreNotes}
        ListFooterComponent={onRenderListFooter}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  )
}

export default EditNotesLayerPage

const styles = StyleSheet.create({
})
