import { useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { graphql } from '../generated'
import { type FragranceReviewsQueryVariables, type FragranceReviewsQuery } from '../generated/graphql'
import { flattenConnection, type FlattenType, type PaginatedQueryHookReturn } from '../common/util-types'

const REVIEWS_LIMIT = 20

const FRAGRANCE_REVIEWS_QUERY = graphql(/* GraphQL */ `
  query FragranceReviews(
    $fragranceId: Int!
    $reviewsInput: QueryInput = {
      pagination: {
        first: 20
        sort: {
          by: votes
        }
      }
    }
  ) {
    fragrance(id: $fragranceId) {
      id
      brand
      name
      rating
      reviewsCount
      reviews(input: $reviewsInput) {
        edges {
          node {
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
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
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

export type FragranceReviewsSummary = Pick<NonNullable<FragranceReviewsQuery['fragrance']>,
'id' | 'brand' | 'name' | 'rating' | 'reviewsCount' | 'reviewDistribution'> | undefined

export type FlattenedFragranceReviewsQuery = FlattenType<NonNullable<FragranceReviewsQuery['fragrance']>>

const useFragranceReviews = (fragranceId: number): PaginatedQueryHookReturn<FlattenedFragranceReviewsQuery['reviews']> & { summary: FragranceReviewsSummary } => {
  const variables = useMemo<FragranceReviewsQueryVariables>(() => ({
    fragranceId,
    reviewsInput: {
      pagination: {
        first: REVIEWS_LIMIT
      }
    }
  }), [fragranceId])

  const { data, loading, error, refetch, fetchMore } = useQuery(FRAGRANCE_REVIEWS_QUERY, { variables })

  const getMore = useCallback(() => {
    if (data?.fragrance == null) return

    const pageInfo = data.fragrance.reviews.pageInfo
    const { hasNextPage, endCursor } = pageInfo

    if (!hasNextPage || (endCursor == null)) return

    const newVariables: FragranceReviewsQueryVariables = {
      ...variables,
      reviewsInput: {
        pagination: {
          ...variables.reviewsInput?.pagination,
          after: endCursor
        }
      }
    }

    void fetchMore({
      variables: newVariables,
      updateQuery: (prev, { fetchMoreResult }) => {
        const c1 = prev.fragrance
        const c2 = fetchMoreResult.fragrance

        if (c1 == null) return fetchMoreResult
        if (c2 == null) return prev

        return {
          fragrance: {
            ...c1,
            reviews: {
              edges: c1.reviews.edges.concat(c2.reviews.edges),
              pageInfo: c2.reviews.pageInfo
            }
          }
        }
      }
    })
  }, [data, variables, fetchMore])

  const refresh = useCallback(() => {
    void refetch(variables)
  }, [variables, refetch])

  const summary = useMemo<FragranceReviewsSummary>(() =>
    ((data?.fragrance) != null)
      ? {
          id: data.fragrance.id,
          brand: data.fragrance.brand,
          name: data.fragrance.name,
          rating: data.fragrance.rating,
          reviewsCount: data.fragrance.reviewsCount,
          reviewDistribution: data.fragrance.reviewDistribution
        }
      : undefined, [data?.fragrance])

  const reviews = useMemo<FlattenedFragranceReviewsQuery['reviews']>(() =>
    flattenConnection(data?.fragrance?.reviews),
  [data?.fragrance?.reviews])

  return {
    data: reviews,
    summary,
    pageInfo: data?.fragrance?.reviews.pageInfo,
    loading,
    error,

    refresh,
    getMore
  }
}

export default useFragranceReviews
