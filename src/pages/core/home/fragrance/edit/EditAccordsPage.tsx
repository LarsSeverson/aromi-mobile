import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFragranceAccords from '@/src/hooks/useFragranceAccords'
import SelectableList, { type SelectableRenderItemProps } from '@/src/components/common/SelectableList'
import { ActivityIndicator, Text } from 'react-native-paper'
import FeedbackButton from '@/src/components/common/FeedbackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import FragranceAccordCard, { type CardFragranceAccord } from '@/src/components/common/fragrance/FragranceAccordCard'
import useVoteOnAccord from '@/src/hooks/useVoteOnAccord'

const EditAccordsPage = () => {
  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const {
    accords,
    loading,
    hasMore,
    getMore
  } = useFragranceAccords({ id: fragranceId, fill: true })

  const { voteOnAccord } = useVoteOnAccord()

  // const handleSearch = useCallback((newSearchTerm: string) => {
  //   localSearchTerm.current = newSearchTerm

  //   // searchAccords(newSearchTerm)
  // }, [])

  const getMoreAccords = useCallback(() => {
    if (!loading) {
      getMore()
    }
  }, [loading, getMore])

  const isAccordSelected = useCallback((accord: CardFragranceAccord) => {
    return accord.myVote ?? false
  }, [])

  const onAccordSelected = useCallback((_: number, fragranceAccord: CardFragranceAccord, myVote: boolean) => {
    voteOnAccord({
      fragranceId,
      accordId: fragranceAccord.accordId,
      myVote
    }, fragranceAccord)
  }, [fragranceId, voteOnAccord])

  const onRenderAccord = useCallback(({ item: accord, selected }: SelectableRenderItemProps<CardFragranceAccord>) => {
    if (accord == null) return null

    return (
      <FragranceAccordCard
        accord={accord}
        selected={selected}
      />
    )
  }, [])

  const onRenderListFooter = useCallback(() => {
    return (
      <View>
        {loading && <ActivityIndicator />}
        {!hasMore && <Text style={{ alignSelf: 'center' }}>End of accords</Text>}
        {!hasMore && <FeedbackButton />}
      </View>
    )
  }, [hasMore, loading])

  if (accords == null) return null

  return (
    <SafeAreaView
      edges={[]}
      style={{ flex: 1 }}
    >
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
