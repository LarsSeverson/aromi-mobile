import { FragranceTraitType, FragranceTraitVote } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export const voteOnTraitMutation = `#graphql
  mutation voteOnTraitMutation ($fragranceId: Int!, $trait: FragranceTraitType!, $value: Float!) {
    voteOnTrait(fragranceId: $fragranceId, trait: $trait, value: $value) {
      id
      fragranceTraitId
      userId
      value
    }
  }
`

export interface VoteOnTraitMutationArgs {
  fragranceId: number
  value: number

  trait: FragranceTraitType
}

export interface VoteOnTraitMutationResult {
  voteOnTrait: FragranceTraitVote
}
