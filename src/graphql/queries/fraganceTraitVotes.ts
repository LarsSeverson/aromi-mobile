import { FragranceTraitVote } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export const fragranceTraitVotesQuery = `#graphql
  query FragranceTraitVotesQuery ($fragranceId: Int!) {
    fragranceTraitVotes (fragranceId: $fragranceId) {
      id
      fragranceId
      fragranceTraitId
      userId

      value

      trait
    }
  }
`

export interface FragranceTraitVotesQueryArgs {
  fragranceId: number
}

export interface FragranceTraitVotesQueryResult {
  fragranceTraitVotes: FragranceTraitVote[]
}
