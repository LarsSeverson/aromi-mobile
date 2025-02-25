import { Fragrance, FragranceReview, FragranceReviewDistribution } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { gql, useQuery } from '@apollo/client'
import { useCallback, useRef, useState } from 'react'

const DEFAULT_LIMIT = 10
const DEFAULT_OFFSET = 0

const FRAGRANCE_REVIEWS_QUERY = gql`
  query FragranceReviews($fragranceId: Int!, $limit: Int, $offset: Int) {
    fragrance(id: $fragranceId) {
      id
      brand
      name
      rating
      reviewsCount
      reviews(limit: $limit, offset: $offset) {
        id
        rating
        review
        votes
        dCreated
        dDeleted
        author 
        myVote
      }
      reviewDistribution {
        one
        two
        three
        four
        five
      }
    }
  }
`

export interface FragranceReviewsVars {
  fragranceId: number
  limit: number
  offset: number
}

export interface FragranceReviewsData {
  fragrance: Fragrance
}

export interface UseFragranceReviewsMeta {
  id: number
  name: string
  brand: string
  reviewsCount: number
  rating: number
  reviewDistribution: FragranceReviewDistribution
}

export interface UseFragranceReviewsProps {
  fragranceId: number
  limit?: number | undefined
  offset?: number | undefined
}

const useFragranceReviews = (props: UseFragranceReviewsProps) => {
  const localVariables = useRef<FragranceReviewsVars>({
    fragranceId: props.fragranceId,
    limit: props.limit ?? DEFAULT_LIMIT,
    offset: props.offset ?? DEFAULT_OFFSET
  })

  const {
    data,
    loading,
    error,
    refetch,
    fetchMore
  } = useQuery<FragranceReviewsData, FragranceReviewsVars>(FRAGRANCE_REVIEWS_QUERY, { variables: localVariables.current })

  const [hasMore, setHasMore] = useState(true)

  const refresh = useCallback((variables: FragranceReviewsVars) => {
    localVariables.current = variables
    localVariables.current.offset = 0
    refetch(variables)
  }, [refetch])

  const getMore = useCallback(() => {
    if (!hasMore) return
    const { offset, limit } = localVariables.current

    const nextOffset = offset + limit
    localVariables.current.offset = nextOffset

    fetchMore({
      variables: { offset: nextOffset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const oldReviews = prev.fragrance?.reviews || []
        const newReviews = fetchMoreResult.fragrance?.reviews || []

        if (newReviews.length < localVariables.current.limit) {
          setHasMore(false)
        }

        return {
          fragrance: {
            ...prev.fragrance,
            reviews: [
              ...oldReviews,
              ...newReviews
            ]
          }
        }
      }
    })
  }, [hasMore, fetchMore])

  return {
    reviews: data?.fragrance.reviews || [],
    meta: data?.fragrance as UseFragranceReviewsMeta,
    loading,
    error,
    hasMore,

    refresh,
    getMore
  }
}

export default useFragranceReviews
