import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import useSuggestedFragrances from '@/src/hooks/useSuggestedFragrances'
import BlockList from '@/src/components/BlockList'
import FragranceBlock from '@/src/components/home/fragrance/FragranceBlock'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useRouter } from 'expo-router'

const HomePage = () => {
  const router = useRouter()
  const { suggestedFragrances, error, loading } = useSuggestedFragrances()

  const onRefresh = useCallback(() => {}, [])

  const openFragrance = useCallback((fragranceId: number) => {
    router.push({ pathname: '/(core)/home/fragrance/', params: { fragranceId } })
  }, [router])

  const onRenderItem = useCallback(({ item }: { item: Fragrance | null }) => {
    if (!item) return null

    return <FragranceBlock fragrance={item} onFragrancePress={openFragrance} />
  }, [openFragrance])

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
