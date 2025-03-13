import { StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import useSuggestedFragrances from '@/src/hooks/useSuggestedFragrances'
import BlockList from '@/src/components/common/BlockList'
import FragrancePreviewCard, { type CardFragrancePreview } from '@/src/components/common/fragrance/FragrancePreviewCard'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomePage = () => {
  const router = useRouter()
  const { data, loadingMore, getMore } = useSuggestedFragrances()

  // const onRefresh = useCallback(() => {}, [])

  const openFragrance = useCallback((fragranceId: number) => {
    router.push({ pathname: '/(core)/home/fragrance/', params: { fragranceId } })
  }, [router])

  const onRenderFragrance = useCallback(({ item: fragrance }: { item: CardFragrancePreview }) => {
    return (
      <FragrancePreviewCard
        fragrance={fragrance}
        onFragrancePress={openFragrance}
        style={{ height: 240 }}
      />
    )
  }, [openFragrance])

  if (data.length === 0) return null

  return (
    <BlockList
      data={data}
      renderItem={onRenderFragrance}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      loadingMore={loadingMore}
      onEndReachedThreshold={0.5}
      style={styles.wrapper}
      onEndReached={() => {
        if (!(loadingMore ?? false)) {
          getMore()
        }
      }}
      initialNumToRender={6}
      ListHeaderComponent={<SafeAreaView edges={['top']} />}
    />
  )
}

export default HomePage

const styles = StyleSheet.create({
  wrapper: {
    padding: 5
  },
  homeContentWrapper: {
    gap: 20
  }
})
