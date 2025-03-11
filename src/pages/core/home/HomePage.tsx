import { StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import useSuggestedFragrances from '@/src/hooks/useSuggestedFragrances'
import BlockList from '@/src/components/common/BlockList'
import FragrancePreviewCard, { type CardFragrancePreview } from '@/src/components/common/fragrance/FragrancePreviewCard'
import { useRouter } from 'expo-router'
import useVoteOnFragrance from '@/src/hooks/useVoteOnFragrance'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomePage = () => {
  const router = useRouter()
  const { data } = useSuggestedFragrances()
  const { voteOnFragrance } = useVoteOnFragrance()

  // const onRefresh = useCallback(() => {}, [])

  const onFragranceVote = useCallback((fragrance: CardFragrancePreview, myVote: boolean | null) => {
    const { id, votes } = fragrance
    const vars = { fragranceId: id, myVote }

    voteOnFragrance(vars, votes)
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
    <SafeAreaView edges={['bottom']} style={styles.wrapper}>
      <BlockList
        data={data}
        renderItem={onRenderFragrance}
        numColumns={2}
        style={{ padding: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
