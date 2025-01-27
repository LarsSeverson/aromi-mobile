export const voteOnNoteMutation = `#graphql
  mutation voteOnNote($fragranceNoteId: Int!, $userId: Int!) {
    voteOnNote(fragranceNoteId: $fragranceNoteId, userId: $userId) {
      id
      userId
      fragranceNoteId
      deletedAt
    }
  }
`

export interface VoteOnNoteMutationArgs {
  fragranceNoteId: number
  userId: number
}

export interface VoteOnAccordMutationResult {
  id: number
  userId: number
  fragranceNoteId: number

  deletedAt: string | null
}
