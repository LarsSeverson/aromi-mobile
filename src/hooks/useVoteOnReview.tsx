import { FragranceReview } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'

const VOTE_ON_REVIEW_MUTATION = gql`
  mutation VoteOnReview($reviewId: Int!, $myVote: Boolean) {
    voteOnReview(reviewId: $reviewId, myVote: $myVote) {
      id
      votes
      myVote
    }
  }
`

export interface VoteOnReviewVars {
  reviewId: number
  myVote: boolean | null
}

export interface VoteOnReviewData {
  voteOnReview: FragranceReview
}

const useVoteOnReview = () => {
  const [voteOnReviewMutation, { loading, error }] = useMutation<VoteOnReviewData, VoteOnReviewVars>(VOTE_ON_REVIEW_MUTATION)

  const voteOnReview = useCallback((variables: VoteOnReviewVars, review: FragranceReview) => {
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
