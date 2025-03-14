import { StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import useSuggestedFragrances, { type SuggestedFragrancesFragrance } from '@/src/hooks/useSuggestedFragrances'
import BlockList from '@/src/components/common/BlockList'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeFragranceBlock from '@/src/components/home/HomeFragranceBlock'

const HomePage = () => {
  const { data, loadingMore, getMore } = useSuggestedFragrances()

  console.log('rendered')

  const onRenderHomeFragranceBlock = useCallback(({ item: fragrance }: { item: SuggestedFragrancesFragrance }) => {
    return <HomeFragranceBlock fragrance={fragrance} />
  }, [])

  if (data.length === 0) return null

  return (
    <BlockList
      data={data}
      renderItem={onRenderHomeFragranceBlock}
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
