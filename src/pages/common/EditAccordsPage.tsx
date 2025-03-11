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

  const { data, pageInfo, loading, getMore } = useFragranceAccords(fragranceId)
  const { voteOnAccord } = useVoteOnAccord()

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
        {!(pageInfo?.hasNextPage ?? true) && <Text style={{ alignSelf: 'center' }}>End of accords</Text>}
        {!(pageInfo?.hasNextPage ?? true) && <FeedbackButton />}
      </View>
    )
  }, [loading, pageInfo?.hasNextPage])

  return (
    <SafeAreaView
      edges={[]}
      style={{ flex: 1 }}
    >
      <SelectableList
        data={data}
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
