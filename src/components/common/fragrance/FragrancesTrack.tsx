import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native'
import React, { useCallback } from 'react'
import { type PressableListProps, type PressableRenderItemProps } from '../PressableList'
import FragrancePreviewCard, { type CardFragrancePreview } from './FragrancePreviewCard'
import useVoteOnFragrance from '@/src/hooks/useVoteOnFragrance'
import BlockList from '../BlockList'

type PressableProps = Omit<PressableListProps<CardFragrancePreview>, 'style' | 'data' | 'onRenderItem'>

export interface FraganceTrackProps extends PressableProps {
  fragrances: CardFragrancePreview[]
  trackStyle?: ViewStyle
  style?: StyleProp<ViewStyle>
  onFragrancePress?: (fragranceId: number) => void
}

const FragrancesTrack = (props: FraganceTrackProps) => {
  const { fragrances, trackStyle, style, onFragrancePress } = props

  const { voteOnFragrance } = useVoteOnFragrance()

  const onFragranceVote = useCallback((fragrance: CardFragrancePreview, myVote: boolean | null) => {
    const { id, votes } = fragrance
    voteOnFragrance({ fragranceId: id, myVote }, votes)
  }, [voteOnFragrance])

  const onRenderFragrance = useCallback(({ item: fragrance }: PressableRenderItemProps<CardFragrancePreview>) => {
    if (fragrance == null) return null

    return (
      <FragrancePreviewCard
        fragrance={fragrance}
        onFragrancePress={onFragrancePress}
        onFragranceVote={onFragranceVote}
        style={StyleSheet.compose(styles.fragrance, style) as ViewStyle}
      />
    )
  }, [style, onFragranceVote, onFragrancePress])

  return (
    <BlockList
      data={fragrances}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={trackStyle}
      renderItem={onRenderFragrance}
    />
  )
}

export default FragrancesTrack

const styles = StyleSheet.create({
  fragrance: {
    height: 200,
    aspectRatio: 1,
    borderRadius: 10
  }
})
