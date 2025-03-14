import React from 'react'
import NotesPyramid from './NotesPyramid'
import FragranceCategory from './FragranceCategory'
import FragranceEmpty from './FragranceEmpty'
import { NoteLayer } from '@/src/generated/graphql'
import { type FragranceInfo } from '@/src/hooks/useFragranceInfo'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'

export interface TopFragranceNotesProps {
  fragranceInfo: FragranceInfo
  onExpand?: () => void
}

const TopFragranceNotes = (props: TopFragranceNotesProps) => {
  const { fragranceInfo, onExpand } = props

  const { data: notes, loading } = useFragranceNotes(fragranceInfo.id, { includeBase: true, includeMiddle: true, includeTop: true })

  const layers = [
    { layer: NoteLayer.Top, notes: notes.top },
    { layer: NoteLayer.Middle, notes: notes.middle },
    { layer: NoteLayer.Base, notes: notes.base }
  ].filter(item => item.notes.length > 0)

  if (loading) return null

  return (
    <FragranceCategory
      title='Notes'
      expandText='how do the notes develop?'
      onCategoryPressed={onExpand}
    >
      {layers.length > 0
        ? <NotesPyramid layers={layers} />
        : <FragranceEmpty headline='No notes yet' />}
    </FragranceCategory>
  )
}

export default TopFragranceNotes
