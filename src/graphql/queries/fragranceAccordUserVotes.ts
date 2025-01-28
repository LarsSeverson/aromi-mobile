export const fragranceAccordUserVotesQuery = `#graphql
  query fragranceAccordUserVotes($fragranceAccordIds: [Int]!, $userId: Int!, $limit: Int, $offset: Int) {
    fragranceAccordUserVotes(fragranceAccordIds: $fragranceAccordIds, userId: $userId, limit: $limit, offset: $offset) {
      id
      fragranceAccordId
      userId

      deletedAt
    }
  }
`

export interface FragranceAccordUserVotesArgs {
  fragranceAccordIds: number[]

  userId: number

  limit?: number | undefined
  offset?: number | undefined
}

export interface FragranceAccordUserVotesResult {
  id: number
  userId: number
  fragranceAccordId: number

  deletedAt: string | null
}

export interface FragranceAccordUserVotesResults {
  fragranceAccordUserVotes: FragranceAccordUserVotesResult[]
}
