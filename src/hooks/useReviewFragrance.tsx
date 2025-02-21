import { FragranceReview } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'

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
      user {
        id
        username
      }
    }
  }
`

export interface ReviewFragranceVars {
  fragranceId: number
  myRating: number
  myReview: string
}

export interface ReviewFragranceData {
  reviewFragrance: FragranceReview
}

const useReviewFragrance = () => {
  const [reviewFragranceMutation, { loading, error }] = useMutation<ReviewFragranceData, ReviewFragranceVars>(REVIEW_FRAGRANCE, {
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

  const reviewFragrance = useCallback((variables: ReviewFragranceVars) => reviewFragranceMutation({ variables }), [reviewFragranceMutation])

  return {
    loading,
    error,
    reviewFragrance
  }
}

export default useReviewFragrance
