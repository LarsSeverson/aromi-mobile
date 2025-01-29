export const fragranceNoteUserVotesQuery = `#graphql
  query fragranceNoteUserVotes($fragranceNoteIds: [Int]!, $userId: Int!, $limit: Int, $offset: Int) {
    fragranceNoteUserVotes(fragranceNoteIds: $fragranceNoteIds, userId: $userId, limit: $limit, offset: $offset) {
      id
      fragranceNoteId
      userId

      deletedAt
    }
  }
`

export interface FragranceNoteUserVotesArgs {
  fragranceNoteIds: number[]

  userId: number

  limit?: number | undefined
  offset?: number | undefined
}

export interface FragranceNoteUserVotesResult {
  id: number
  userId: number
  fragranceNoteId: number

  deletedAt: string | null
}

export interface FragranceNoteUserVotesResults {
  fragranceNoteUserVotes: FragranceNoteUserVotesResult[]
}
