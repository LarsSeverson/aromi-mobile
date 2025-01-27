export const voteOnAccordMutation = `#graphql
  mutation voteOnAccord($fragranceAccordId: Int!, $userId: Int!) {
    voteOnAccord(fragranceAccordId: $fragranceAccordId, userId: $userId) {
      id
      userId
      fragranceAccordId
      deletedAt
    }
  }
`

export interface VoteOnAccordMutationArgs {
  fragranceAccordId: number
  userId: number
}

export interface VoteOnAccordMutationResult {
  id: number
  userId: number
  fragranceAccordId: number

  deletedAt: string | null
}
