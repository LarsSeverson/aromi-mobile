import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import useSuggestedFragrances from '@/src/hooks/useSuggestedFragrances'
import BlockList from '@/src/components/common/BlockList'
import FragrancePreviewCard, { type CardFragrancePreview } from '@/src/components/common/fragrance/FragrancePreviewCard'
import { useRouter } from 'expo-router'
import useVoteOnFragrance from '@/src/hooks/useVoteOnFragrance'

const HomePage = () => {
  const router = useRouter()
  const { suggestedFragrances } = useSuggestedFragrances()
  const { voteOnFragrance } = useVoteOnFragrance()

  // const onRefresh = useCallback(() => {}, [])

  const onFragranceVote = useCallback((fragrance: CardFragrancePreview, myVote: boolean | null) => {
    const { id, vote } = fragrance
    const vars = { fragranceId: id, myVote }

    voteOnFragrance(vars, vote)
  }, [voteOnFragrance])

  const openFragrance = useCallback((fragranceId: number) => {
    router.push({ pathname: '/(core)/home/fragrance/', params: { fragranceId } })
  }, [router])

  const onRenderFragrance = useCallback(({ item: fragrance }: { item: CardFragrancePreview | null }) => {
    if (fragrance == null) return null

    return (
      <FragrancePreviewCard
        fragrance={fragrance}
        onFragrancePress={openFragrance}
        onFragranceVote={onFragranceVote}
      />
    )
  }, [onFragranceVote, openFragrance])

  // const expandForYou = () => {}

  return (
    <View style={styles.wrapper}>
      <BlockList
        data={suggestedFragrances}
        renderItem={onRenderFragrance}
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
