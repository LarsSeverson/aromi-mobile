import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { ReviewFragranceMutationVariables } from '../gql/graphql'

const REVIEW_FRAGRANCE = gql`
  mutation ReviewFragrance($fragranceId: Int!, $myRating: Int!, $myReview: String!) {
    reviewFragrance(fragranceId: $fragranceId, myRating: $myRating, myReview: $myReview) {
      id
      rating
      review
      votes
      myVote
      dCreated
      dModified
      author 
    }
  }
`

const useReviewFragrance = () => {
  const [reviewFragranceMutation, { loading, error }] = useMutation(REVIEW_FRAGRANCE, {
    update (cache, result, { variables }) {
      const reviewFragrance = result.data?.reviewFragrance || null
      if (!variables || !reviewFragrance) return

      cache.modify({
        id: cache.identify({ __typename: 'Fragrance', id: variables.fragranceId }),
        fields: {
          myReview () {
            return reviewFragrance
          }
        }
      })
    }
  })

  const reviewFragrance = useCallback((variables: ReviewFragranceMutationVariables) => reviewFragranceMutation({ variables }), [reviewFragranceMutation])

  return {
    loading,
    error,
    reviewFragrance
  }
}

export default useReviewFragrance
