import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { graphql } from '../generated'
import { type VoteOnTraitMutationVariables, type FragranceTrait } from '../generated/graphql'

const VOTE_ON_TRAIT_MUTATION = graphql(/* GraphQL */ `
  mutation VoteOnTrait($fragranceId: Int!, $trait: FragranceTraitType!, $myVote: Float!) {
    voteOnTrait(fragranceId: $fragranceId, trait: $trait, myVote: $myVote) {
      id
      trait
      value
      myVote
    }
  }
`)

export type VoteOnTraitOld = Pick<FragranceTrait, 'id' | 'trait' | 'value' | 'myVote'>

const useVoteOnTrait = () => {
  const [voteOnTraitMutation, {
    loading,
    error
  }] = useMutation(VOTE_ON_TRAIT_MUTATION)

  const voteOnTrait = useCallback((variables: VoteOnTraitMutationVariables, trait: VoteOnTraitOld) => {
    void voteOnTraitMutation({
      variables,
      optimisticResponse: {
        voteOnTrait: {
          ...trait,
          myVote: variables.myVote
        }
      }
    })
  }, [voteOnTraitMutation])

  return {
    loading,
    error,
    voteOnTrait
  }
}

export default useVoteOnTrait
