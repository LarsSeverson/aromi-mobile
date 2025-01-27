import { StyleSheet, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFragranceAccords from '@/src/hooks/useFragranceAccords'
import { useAppTheme } from '@/src/constants/Themes'
import ButtonText from '@/src/components/utils/ButtonText'
import { Colors } from '@/src/constants/Colors'
import SearchInput from '@/src/components/utils/SearchInput'
import SelectableList, { SelectableRenderItemProps } from '@/src/components/utils/SelectableList'
import { FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import SelectableAccord from '@/src/components/fragrance/SelectableAccord'
import { ActivityIndicator, Text } from 'react-native-paper'
import FeedbackButton from '@/src/components/utils/FeedbackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import useResolver from '@/src/hooks/useResolver'
import { FragranceAccordUserVotesArgs, fragranceAccordUserVotesQuery, FragranceAccordUserVotesResults } from '@/src/graphql/queries/fragranceAccordUserVotes'

const EditAccordsPage = () => {
  const theme = useAppTheme()
  const router = useRouter()

  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const selectedAccords = useRef(new Map<number, FragranceAccord>())
  const localSearchTerm = useRef('')

  const {
    accords,
    loading,
    error,
    noResults,
    hasMore,
    refresh,
    search,
    getMore
  } = useFragranceAccords(fragranceId, localSearchTerm.current)

  const {
    data,
    loading: votesLoading,
    error: votesError,
    execute,
    reset
  } = useResolver<FragranceAccordUserVotesResults, FragranceAccordUserVotesArgs>(
    {
      resolver: fragranceAccordUserVotesQuery,
      type: 'query',
      authMode: 'userPool'
    })

  const searchAccords = useCallback(search, [search])
  const getMoreAccords = useCallback(() => { !loading && hasMore && getMore() }, [loading, hasMore, getMore])

  const handleSearch = useCallback((newSearchTerm: string) => {
    localSearchTerm.current = newSearchTerm

    searchAccords(newSearchTerm)
  }, [searchAccords])

  const onAccordSelected = useCallback((id: number, accord: FragranceAccord) => {
    selectedAccords.current.has(id)
      ? selectedAccords.current.delete(id)
      : selectedAccords.current.set(id, accord)
  }, [])

  const onRenderAccord = useCallback(({ item, index, selected }: SelectableRenderItemProps<FragranceAccord>) => {
    return <SelectableAccord item={item} index={index} selected={selected} />
  }, [])

  const onRenderListFooter = useCallback(() => {
    return (
      <View>
        {loading && <ActivityIndicator />}
        {!hasMore && <Text style={{ alignSelf: 'center' }}>End of accords</Text>}
        {!noResults && !hasMore && <FeedbackButton />}
      </View>
    )
  }, [hasMore, loading, noResults])

  if (!accords) {
    return null
  }

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <SearchInput onSearch={handleSearch} />

      <SelectableList
        data={accords}
        numColumns={3}
        onEndReachedThreshold={0.5}
        selectedItems={selectedAccords.current}
        renderItemStyle={{ width: '33.33%' }}
        renderItem={onRenderAccord}
        onItemSelected={onAccordSelected}
        onEndReached={getMoreAccords}
        ListFooterComponent={onRenderListFooter}
      />
    </SafeAreaView>
  )
}

export default EditAccordsPage

const styles = StyleSheet.create({

})
