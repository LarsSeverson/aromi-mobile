import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { graphql } from '../generated'
import { type FragranceAccord, type VoteOnAccordMutationVariables } from '../generated/graphql'

const VOTE_ON_ACCORD_MUTATION = graphql(/* GraphQL */ `
  mutation VoteOnAccord($fragranceId: Int!, $accordId: Int!, $myVote: Boolean!) {
    voteOnAccord(fragranceId: $fragranceId, accordId: $accordId, myVote: $myVote) {
      id
      votes
      myVote
    }
  }
`)

export type VoteOnAccordOld = Pick<FragranceAccord, 'id' | 'accordId' | 'votes' | 'myVote'>

const useVoteOnAccord = () => {
  const [voteOnAccordMutation, {
    loading,
    error
  }] = useMutation(VOTE_ON_ACCORD_MUTATION)

  const voteOnAccord = useCallback((variables: VoteOnAccordMutationVariables, accord: VoteOnAccordOld) => {
    const curVotes = accord.votes + (variables.myVote ? 1 : -1)

    void voteOnAccordMutation({
      variables,
      optimisticResponse: {
        voteOnAccord: {
          ...accord,
          votes: curVotes,
          myVote: variables.myVote
        }
      }
    })
  }, [voteOnAccordMutation])

  return {
    loading,
    error,
    voteOnAccord
  }
}

export default useVoteOnAccord
