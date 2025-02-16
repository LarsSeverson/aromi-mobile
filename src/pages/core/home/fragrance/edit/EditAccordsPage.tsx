import { StyleSheet, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFragranceAccords from '@/src/hooks/useFragranceAccords'
import SearchInput from '@/src/components/SearchInput'
import SelectableList, { SelectableRenderItemProps } from '@/src/components/SelectableList'
import { FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import SelectableAccord from '@/src/components/home/fragrance-page/SelectableAccord'
import { ActivityIndicator, Text } from 'react-native-paper'
import FeedbackButton from '@/src/components/FeedbackButton'
import { SafeAreaView } from 'react-native-safe-area-context'

const EditAccordsPage = () => {
  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const localSearchTerm = useRef('')

  const {
    accords,
    loading,
    errors,
    hasMore,
    getMore,
    voteOnAccord
  } = useFragranceAccords({ id: fragranceId, fill: true })

  const handleSearch = useCallback((newSearchTerm: string) => {
    localSearchTerm.current = newSearchTerm

    // searchAccords(newSearchTerm)
  }, [])

  const getMoreAccords = useCallback(() => {
    !loading.accordsLoading && getMore()
  }, [loading.accordsLoading, getMore])

  const isAccordSelected = useCallback((accord: FragranceAccord) => {
    return accord.myVote
  }, [])

  const onAccordSelected = useCallback((_: number, fragranceAccord: FragranceAccord, myVote: boolean) => {
    voteOnAccord({
      fragranceId,
      accordId: fragranceAccord.accordId,
      myVote
    }, fragranceAccord)
  }, [fragranceId, voteOnAccord])

  const onRenderAccord = useCallback(({ item, index, selected }: SelectableRenderItemProps<FragranceAccord>) => {
    if (!item) return null

    return <SelectableAccord item={item} index={index} selected={selected} originallySelected={item.myVote} />
  }, [])

  const onRenderListFooter = useCallback(() => {
    return (
      <View>
        {loading.accordsLoading && <ActivityIndicator />}
        {!hasMore && <Text style={{ alignSelf: 'center' }}>End of accords</Text>}
        {!hasMore && <FeedbackButton />}
      </View>
    )
  }, [hasMore, loading.accordsLoading])

  if (!accords) return null

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      {/* <SearchInput onSearch={handleSearch} /> */}

      <SelectableList
        data={accords}
        numColumns={3}
        onEndReachedThreshold={0.5}
        renderItemStyle={{ width: '33.33%' }}
        style={styles.listWrapper}
        isSelected={isAccordSelected}
        onRenderItem={onRenderAccord}
        onItemSelected={onAccordSelected}
        onEndReached={getMoreAccords}
        ListFooterComponent={onRenderListFooter}
      />
    </SafeAreaView>
  )
}

export default EditAccordsPage

const styles = StyleSheet.create({
  listWrapper: {
    padding: 10
  }
})
