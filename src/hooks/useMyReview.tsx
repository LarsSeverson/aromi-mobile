import { useLazyQuery } from '@apollo/client'
import { useCallback } from 'react'
import { graphql } from '../generated'

const MY_REVIEW_QUERY = graphql(/* GraphQL */ `
  query MyReview($fragranceId: Int!) {
    fragrance(id: $fragranceId) {
      id
      myReview {
        id
        rating
        review
        votes
        dCreated
        dModified
        dDeleted
        author 
        myVote
      }
    }
  }
`)

export const useMyReview = () => {
  const [getMyReviewQuery, { data, loading, error }] = useLazyQuery(MY_REVIEW_QUERY)

  const getMyReview = useCallback((fragranceId: number) => {
    void getMyReviewQuery({ variables: { fragranceId } })
  }, [getMyReviewQuery])

  return {
    myReview: data?.fragrance?.myReview,
    loading,
    error,
    getMyReview
  }
}
