import { useQuery } from '@apollo/client'
import { useCallback, useRef, useState } from 'react'
import { graphql } from '../generated'
import { type FragranceReviewsQueryVariables, type FragranceReviewsQuery } from '../generated/graphql'
import { type NonNullableVariables } from '../common/util-types'

const FRAGRANCE_REVIEWS_QUERY = graphql(/* GraphQL */ `
  query FragranceReviews($fragranceId: Int!, $limit: Int = 10, $offset: Int = 0) {
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
        dModified
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
`)

export type FragranceReviewsMeta = Pick<NonNullable<FragranceReviewsQuery['fragrance']>,
'id' | 'brand' | 'name' | 'rating' | 'reviewsCount' | 'reviewDistribution'>

const useFragranceReviews = (variables: FragranceReviewsQueryVariables) => {
  const {
    data,
    loading,
    error,
    refetch,
    fetchMore
  } = useQuery(FRAGRANCE_REVIEWS_QUERY, { variables })

  const localVariables = useRef<NonNullableVariables<FragranceReviewsQueryVariables>>({
    fragranceId: variables.fragranceId,
    limit: variables.limit ?? 30,
    offset: variables.offset ?? 0
  })

  const [hasMore, setHasMore] = useState(true)

  const refresh = useCallback((variables: FragranceReviewsQueryVariables = localVariables.current) => {
    localVariables.current = {
      fragranceId: variables.fragranceId,
      limit: variables.limit ?? 30,
      offset: 0
    }

    void refetch(localVariables.current)
  }, [refetch])

  const getMore = useCallback(() => {
    if (!hasMore) return
    const { offset, limit } = localVariables.current

    const nextOffset = offset + limit
    localVariables.current.offset = nextOffset

    void fetchMore({
      variables: { offset: nextOffset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (prev.fragrance == null) return fetchMoreResult
        if (fetchMoreResult.fragrance == null) return prev

        const oldReviews = prev.fragrance?.reviews ?? []
        const newReviews = fetchMoreResult.fragrance?.reviews ?? []

        if (newReviews.length < localVariables.current.limit) {
          setHasMore(false)
        }

        const reviews = oldReviews.concat(newReviews)

        return {
          fragrance: {
            ...prev.fragrance,
            reviews
          }
        }
      }
    })
  }, [hasMore, fetchMore])

  return {
    reviews: data?.fragrance?.reviews ?? [],
    meta: data?.fragrance as FragranceReviewsMeta,
    loading,
    error,
    hasMore,

    refresh,
    getMore
  }
}

export default useFragranceReviews
