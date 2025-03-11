import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { graphql } from '../generated'
import { type FragranceVotes, type VoteOnFraganceMutationVariables } from '../generated/graphql'

const VOTE_ON_FRAGRANCE_MUTATION = graphql(/* GraphQL */ `
  mutation VoteOnFragance($fragranceId: Int!, $myVote: Boolean) {
    voteOnFragrance(fragranceId: $fragranceId, myVote: $myVote) {
      id
      likes
      dislikes
      myVote
    } 
  }
`)

const useVoteOnFragrance = () => {
  const [voteOnFragranceMutation, {
    loading,
    error
  }] = useMutation(VOTE_ON_FRAGRANCE_MUTATION)

  const voteOnFragrance = useCallback((variables: VoteOnFraganceMutationVariables, votes: FragranceVotes) => {
    void voteOnFragranceMutation({
      variables,
      optimisticResponse: {
        voteOnFragrance: {
          ...votes,
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
