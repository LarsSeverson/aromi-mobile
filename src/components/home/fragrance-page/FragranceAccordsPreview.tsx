import React, { useMemo } from 'react'
import AccordsLadder from './AccordsLadder'
import FragranceCategory from './FragranceCategory'
import { FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import FragranceEmpty from './FragranceEmpty'

export interface FragranceAccordsPreviewProps {
  accords: FragranceAccord[]
  onExpand?: () => void
}

const FragranceAccordsPreview = (props: FragranceAccordsPreviewProps) => {
  const { accords, onExpand } = props
  const maxVote = useMemo(() => accords.at(0)?.votes || 0, [accords])

  return (
    <FragranceCategory title='Top accords' expandText='how are the accords?' onExpand={onExpand}>
      {accords.length > 0
        ? <AccordsLadder accords={accords} maxVote={maxVote} />
        : <FragranceEmpty headline='No accords yet' />}
    </FragranceCategory>
  )
}

export default FragranceAccordsPreview
