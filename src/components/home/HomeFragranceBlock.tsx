import { StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import FragrancePreviewCard, { type CardFragrancePreview } from '../common/fragrance/FragrancePreviewCard'
import { useRouter } from 'expo-router'
import useVoteOnFragrance from '@/src/hooks/useVoteOnFragrance'

export interface HomeFragranceBlockProps {
  fragrance: CardFragrancePreview
}

const HomeFragranceBlock = (props: HomeFragranceBlockProps) => {
  const router = useRouter()
  const { fragrance } = props

  const { voteOnFragrance } = useVoteOnFragrance()

  const handleFragrancePress = useCallback(() => {
    const { id } = fragrance
    router.push({ pathname: '/(core)/home/fragrance/', params: { fragranceId: id } })
  }, [fragrance, router])

  const handleFragranceVote = useCallback((myVote: boolean | null) => {
    const { id } = fragrance
    const vars = { fragranceId: id, myVote }
    voteOnFragrance(vars)
  }, [fragrance, voteOnFragrance])

  return (
    <FragrancePreviewCard
      fragrance={fragrance}
      onFragrancePress={handleFragrancePress}
      onFragranceVote={handleFragranceVote}
      style={styles.fragrance}
    />
  )
}

export default React.memo(HomeFragranceBlock)

const styles = StyleSheet.create({
  fragrance: {
    height: 240
  }
})
