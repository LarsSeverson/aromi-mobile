export const voteOnAccordMutation = `#graphql
  mutation voteOnAccord($fragranceId: Int!, $accordId: Int!) {
    voteOnAccord(fragranceId: $fragranceId, accordId: $accordId) {
      id
      userId
      fragranceAccordId
      deletedAt
    }
  }
`

export interface VoteOnAccordMutationArgs {
  fragranceId: number
  accordId: number
}

export interface VoteOnAccordMutationResult {
  id: number
  userId: number
  fragranceAccordId: number

  deletedAt: string | null
}
