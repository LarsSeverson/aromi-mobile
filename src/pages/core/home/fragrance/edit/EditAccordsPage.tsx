import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFragranceAccords from '@/src/hooks/useFragranceAccords'
import SearchInput from '@/src/components/utils/SearchInput'
import SelectableList, { SelectableRenderItemProps } from '@/src/components/utils/SelectableList'
import { FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import SelectableAccord from '@/src/components/fragrance/SelectableAccord'
import { ActivityIndicator, Text } from 'react-native-paper'
import FeedbackButton from '@/src/components/utils/FeedbackButton'
import { SafeAreaView } from 'react-native-safe-area-context'

const EditAccordsPage = () => {
  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const localSearchTerm = useRef('')

  const {
    accords,
    votes,

    error,
    loading,

    noResults,
    hasMore,

    searchByName,
    getMore,
    vote,
    refresh
  } = useFragranceAccords(fragranceId)

  const searchAccords = useCallback(searchByName, [searchByName])

  const getMoreAccords = useCallback(() => {
    if (!loading.accords && !loading.votes) {
      hasMore && getMore()
    }
  }, [loading, hasMore, getMore])

  const handleSearch = useCallback((newSearchTerm: string) => {
    localSearchTerm.current = newSearchTerm

    searchAccords(newSearchTerm)
  }, [searchAccords])

  const onRenderAccord = useCallback(({ item, index, selected }: SelectableRenderItemProps<FragranceAccord>) => {
    const originallySelected = (item && votes?.has(item.id)) || false

    return <SelectableAccord item={item} index={index} selected={selected} originallySelected={originallySelected} />
  }, [votes])

  const onRenderListFooter = useCallback(() => {
    return (
      <View>
        {(loading.accords || loading.votes) && <ActivityIndicator />}
        {!hasMore && <Text style={{ alignSelf: 'center' }}>End of accords</Text>}
        {!noResults && !hasMore && <FeedbackButton />}
      </View>
    )
  }, [hasMore, loading.accords, loading.votes, noResults])

  if (!accords || !votes) return null

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <SearchInput onSearch={handleSearch} />

      <SelectableList
        data={accords}
        numColumns={3}
        onEndReachedThreshold={0.5}
        selectedItems={votes}
        renderItemStyle={{ width: '33.33%' }}
        style={styles.listWrapper}
        renderItem={onRenderAccord}
        onItemSelected={vote}
        onEndReached={getMoreAccords}
        ListFooterComponent={onRenderListFooter}
      />
    </SafeAreaView>
  )
}

export default EditAccordsPage

const styles = StyleSheet.create({
  listWrapper: {
    padding: 5
  }
})
