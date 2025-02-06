import { StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import useSuggestedFragrances from '@/src/hooks/useSuggestedFragrances'
import BlockList from '@/src/components/BlockList'
import FragranceBlock from '@/src/components/home/fragrance/FragranceBlock'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'

const HomePage = () => {
  const { suggestedFragrances, loading } = useSuggestedFragrances()

  const onRefresh = useCallback(() => {}, [])

  const onRenderItem = useCallback(({ item }: { item: Fragrance | null }) => {
    if (!item) return null

    return <FragranceBlock fragrance={item} />
  }, [])

  const expandForYou = () => {}

  return (
    <View style={styles.wrapper}>
      <BlockList
        data={suggestedFragrances}
        renderItem={onRenderItem}
        numColumns={2}
        style={{ padding: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  wrapper: {

  },
  homeContentWrapper: {
    gap: 20
  }
})
