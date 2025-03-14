import React from 'react'
import AccordsLadder from './AccordsLadder'
import FragranceCategory from './FragranceCategory'
import FragranceEmpty from './FragranceEmpty'
import { type FragranceInfo } from '@/src/hooks/useFragranceInfo'
import useFragranceAccords from '@/src/hooks/useFragranceAccords'

export interface TopFragranceAccordsProps {
  fragranceInfo: FragranceInfo
  onExpand?: () => void
}

const TopFragranceAccords = (props: TopFragranceAccordsProps) => {
  const { fragranceInfo, onExpand } = props
  const { data: accords, loading } = useFragranceAccords(fragranceInfo.id, 8, false)

  const maxVote = accords.at(0)?.votes ?? 0

  if (loading) return null

  return (
    <FragranceCategory
      title='Top accords'
      expandText='how are the accords?'
      onCategoryPressed={onExpand}
    >
      {accords.length > 0
        ? (
          <AccordsLadder
            accords={accords}
            maxVote={maxVote}
          />
          )
        : (
          <FragranceEmpty
            headline='No accords yet'
          />
          )}
    </FragranceCategory>
  )
}

export default TopFragranceAccords
