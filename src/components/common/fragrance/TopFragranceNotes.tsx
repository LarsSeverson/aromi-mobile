import React from 'react'
import NotesPyramid from './NotesPyramid'
import FragranceCategory from './FragranceCategory'
import FragranceEmpty from './FragranceEmpty'
import { FragranceNotes, NoteLayer } from '@/src/gql/graphql'

export interface FragranceNotesPreviewProps {
  notes: FragranceNotes
  onExpand?: () => void
}

const TopFragranceNotes = (props: FragranceNotesPreviewProps) => {
  const { notes, onExpand } = props

  const layers = [
    { layer: NoteLayer.Top, notes: notes.top },
    { layer: NoteLayer.Middle, notes: notes.middle },
    { layer: NoteLayer.Base, notes: notes.base }
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
