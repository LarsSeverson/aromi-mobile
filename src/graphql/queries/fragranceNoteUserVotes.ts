export const fragranceNoteUserVotesQuery = `#graphql
  query fragranceNoteUserVotes($fragranceAccordIds: [Int]!, $userId: Int!, $limit: Int, $offset: Int) {
    fragranceNoteUserVotes(fragranceAccordIds: $fragranceAccordIds, userId: $userId, limit: $limit, offset: $offset) {
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

export type FragranceNoteUserVotesResults = FragranceNoteUserVotesResult[]
