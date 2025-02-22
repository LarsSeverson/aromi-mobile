import React from 'react'
import { FragranceNotes, NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import NotesPyramid from './NotesPyramid'
import FragranceCategory from './FragranceCategory'
import FragranceEmpty from './FragranceEmpty'

export interface FragranceNotesPreviewProps {
  notes: FragranceNotes
  onExpand?: () => void
}

const TopFragranceNotes = (props: FragranceNotesPreviewProps) => {
  const { notes, onExpand } = props

  const layers = [
    { layer: NoteLayerType.TOP, notes: notes.top },
    { layer: NoteLayerType.MIDDLE, notes: notes.middle },
    { layer: NoteLayerType.BASE, notes: notes.base }
  ].filter(item => item.notes.length > 0)

  return (
    <FragranceCategory title='Notes' expandText='how do the notes develop?' onCategoryPressed={onExpand}>
      {layers.length > 0
        ? <NotesPyramid layers={layers} />
        : <FragranceEmpty headline='No notes yet' />}
    </FragranceCategory>
  )
}

export default TopFragranceNotes
