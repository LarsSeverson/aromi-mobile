import { StyleSheet, type ViewStyle } from 'react-native'
import React, { useCallback } from 'react'
import { type PressableListProps, type PressableRenderItemProps } from '../PressableList'
import FragrancePreviewCard, { type CardFragrancePreview } from './FragrancePreviewCard'
import useVoteOnFragrance from '@/src/hooks/useVoteOnFragrance'
import BlockList from '../BlockList'

type PressableProps = Omit<PressableListProps<CardFragrancePreview>, 'style' | 'data' | 'onRenderItem'>

export interface FraganceTrackProps extends PressableProps {
  fragrances: CardFragrancePreview[]
  style?: ViewStyle
  onFragrancePress?: (fragranceId: number) => void
}

const FragrancesTrack = (props: FraganceTrackProps) => {
  const { fragrances, style, onFragrancePress } = props

  const { voteOnFragrance } = useVoteOnFragrance()

  const onFragranceVote = useCallback((fragrance: CardFragrancePreview, myVote: boolean | null) => {
    const { id, vote } = fragrance
    voteOnFragrance({ fragranceId: id, myVote }, vote)
  }, [voteOnFragrance])

  const onRenderFragrance = useCallback(({ item: fragrance }: PressableRenderItemProps<CardFragrancePreview>) => {
    if (fragrance == null) return null

    return (
      <FragrancePreviewCard
        fragrance={fragrance}
        onFragrancePress={onFragrancePress}
        onFragranceVote={onFragranceVote}
        style={styles.fragrance}
      />
    )
  }, [onFragranceVote, onFragrancePress])

  const columnProps = fragrances.length > 1
    ? { columnWrapperStyle: StyleSheet.compose(styles.wrapper, style) as ViewStyle }
    : {}

  return (
    <BlockList
      data={fragrances}
      horizontal
      {...columnProps}
      renderItem={onRenderFragrance}
    />
  )
}

export default FragrancesTrack

const styles = StyleSheet.create({
  wrapper: {
    gap: 10
  },
  fragrance: {
    height: 200,
    aspectRatio: 1,
    borderRadius: 10
  }
})
