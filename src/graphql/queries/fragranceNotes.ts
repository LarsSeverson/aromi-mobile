import { FragranceNote, NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'

const fragranceNotes = `#graphql
  query fragranceNotes($id: Int!, $layer: NoteLayer!, $name: String, $limit: Int, $offset: Int, $fill: Boolean) {
    fragranceNotes(id: $id, layer: $layer, name: $name, limit: $limit, offset: $offset, fill: $fill) {
      id
      noteId
      name
      votes
      layer
    }
  }
`

export interface FragranceNotesArgs {
  id: number
  limit?: number | undefined
  offset?: number | undefined

  fill?: boolean | undefined

  name?: string | undefined

  layer: NoteLayer
}

export interface FragranceNotesResult {
  fragranceNotes: FragranceNote[]
}

export default fragranceNotes
