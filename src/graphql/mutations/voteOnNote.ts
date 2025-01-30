import { NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export const voteOnNoteMutation = `#graphql
  mutation voteOnNote($fragranceId: Int!, $noteId: Int!, $layer: NoteLayer!) {
    voteOnNote(fragranceId: $fragranceId, noteId: $noteId, layer: $layer) {
      id
      userId
      fragranceNoteId
      deletedAt
    }
  }
`

export interface VoteOnNoteMutationArgs {
  fragranceId: number
  noteId: number

  layer: NoteLayer
}

export interface VoteOnAccordMutationResult {
  id: number
  userId: number
  fragranceNoteId: number

  deletedAt: string | null
}
