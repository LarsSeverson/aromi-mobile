import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { graphql } from '../generated'
import { type FragranceReview, type VoteOnReviewMutationVariables } from '../generated/graphql'

const VOTE_ON_REVIEW_MUTATION = graphql(/* GraphQL */`
  mutation VoteOnReview($reviewId: Int!, $myVote: Boolean) {
    voteOnReview(reviewId: $reviewId, myVote: $myVote) {
      id
      votes
      myVote
    }
  }
`)

const useVoteOnReview = () => {
  const [voteOnReviewMutation, { loading, error }] = useMutation(VOTE_ON_REVIEW_MUTATION)

  const voteOnReview = useCallback(async (variables: VoteOnReviewMutationVariables, review: FragranceReview) => {
    const myVote = variables.myVote ?? null
    const voteDelta = myVote === null ? 0 : myVote ? 1 : -1
    const curVotes = review.votes + voteDelta

    return await voteOnReviewMutation({
      variables,
      optimisticResponse: {
        voteOnReview: {
          ...review,
          votes: curVotes,
          myVote
        }
      }
    })
  }, [voteOnReviewMutation])

  return {
    loading,
    error,

    voteOnReview
  }
}

export default useVoteOnReview
