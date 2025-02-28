import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { FragranceVote } from '../gql/graphql'

const VOTE_ON_FRAGRANCE_MUTATION = gql`
  mutation VoteOnFragance($fragranceId: Int!, $myVote: Boolean) {
    voteOnFragrance(fragranceId: $fragranceId, myVote: $myVote) {
      id
      likes
      dislikes
      myVote
    } 
  }
`

export interface VoteOnFragranceVars {
  fragranceId: number
  myVote: boolean | null
}

export interface VoteOnFragranceData {
  voteOnFragrance: FragranceVote
}

const useVoteOnFragrance = () => {
  const [voteOnFragranceMutation, {
    data,
    loading,
    error
  }] = useMutation<VoteOnFragranceData, VoteOnFragranceVars>(VOTE_ON_FRAGRANCE_MUTATION)

  const voteOnFragrance = useCallback((variables: VoteOnFragranceVars, vote: FragranceVote) => {
    voteOnFragranceMutation({
      variables,
      optimisticResponse: {
        voteOnFragrance: {
          ...vote,
          myVote: variables.myVote
        }
      }
    })
  }, [voteOnFragranceMutation])

  return {
    loading,
    error,
    voteOnFragrance
  }
}

export default useVoteOnFragrance
