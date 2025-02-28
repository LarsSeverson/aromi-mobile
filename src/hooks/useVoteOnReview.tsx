import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { graphql } from '../gql'
import { FragranceReview, VoteOnReviewMutationVariables } from '../gql/graphql'

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

  const voteOnReview = useCallback((variables: VoteOnReviewMutationVariables, review: FragranceReview) => {
    const myVote = variables.myVote
    const curVotes = review.votes

    return voteOnReviewMutation({
      variables,
      optimisticResponse: {
        voteOnReview: {
          ...review,
          votes: myVote ? curVotes + 1 : curVotes - 1,
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
