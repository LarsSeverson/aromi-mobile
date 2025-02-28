import { gql, useLazyQuery } from '@apollo/client'
import { useCallback } from 'react'
import { FragranceReview } from '../gql/graphql'

const MY_REVIEW_QUERY = gql`
  query MyReview($fragranceId: Int!) {
    fragrance(id: $fragranceId) {
      id
      myReview {
        id
        rating
        review
        votes
        dCreated
        dDeleted
        author 
        myVote
      }
    }
  }
`

export interface MyReviewVars {
  fragranceId: number
}

export interface MyReviewData {
  fragrance: {
    myReview: FragranceReview | null
  }
}

export const useMyReview = () => {
  const [getMyReviewQuery, { data, loading, error }] = useLazyQuery<MyReviewData, MyReviewVars>(MY_REVIEW_QUERY)

  const getMyReview = useCallback((fragranceId: number) => {
    getMyReviewQuery({ variables: { fragranceId } })
  }, [getMyReviewQuery])

  return {
    myReview: data?.fragrance?.myReview,
    loading,
    error,
    getMyReview
  }
}
