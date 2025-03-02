import React from 'react'
import AccordsLadder from './AccordsLadder'
import FragranceCategory from './FragranceCategory'
import FragranceEmpty from './FragranceEmpty'
import { type CardFragranceAccord } from './FragranceAccordCard'

export interface FragranceAccordsPreviewProps {
  accords: CardFragranceAccord[]
  onExpand?: () => void
}

const TopFragranceAccords = (props: FragranceAccordsPreviewProps) => {
  const { accords, onExpand } = props
  const maxVote = accords.at(0)?.votes ?? 0

  return (
    <FragranceCategory title='Top accords' expandText='how are the accords?' onCategoryPressed={onExpand}>
      {accords.length > 0
        ? <AccordsLadder accords={accords} maxVote={maxVote} />
        : <FragranceEmpty headline='No accords yet' />}
    </FragranceCategory>
  )
}

export default TopFragranceAccords
