import { useCallback, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { graphql } from '../generated'
import { type SuggestedFragrancesQuery, type SuggestedFragrancesQueryVariables } from '../generated/graphql'
import { flattenConnection, type FlattenType, type PaginatedQueryHookReturn } from '../common/util-types'

const FRAGRANCES_LIMIT = 20

const SUGGESTED_FRAGRANCES_QUERY = graphql(/* GraphQL */ `
  query SuggestedFragrances(
    $input: QueryInput = { 
      pagination: { 
        first: 20
      }
    }
    $imagesInput: QueryInput = { 
      pagination: { 
        first: 1
      }
    }
  ) {
    fragrances(input: $input) {
      edges {
        node {
          id
          brand
          name
          votes {
            id
            dislikes
            likes
            myVote
          }
          images(input: $imagesInput) {
            edges {
              node {
                id
                url
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  } 
`)

export type FlattendedSuggestedFragrancesData = FlattenType<SuggestedFragrancesQuery>

const useSuggestedFragrances = (): PaginatedQueryHookReturn<FlattendedSuggestedFragrancesData['fragrances']> => {
  const variables = useMemo<SuggestedFragrancesQueryVariables>(() => ({
    input: { pagination: { first: FRAGRANCES_LIMIT } }
  }), [])

  const { data, loading, error, fetchMore, refetch } = useQuery(SUGGESTED_FRAGRANCES_QUERY, { variables })

  const getMore = useCallback(() => {
    if (data == null) return

    const pageInfo = data.fragrances.pageInfo
    const { hasNextPage, endCursor } = pageInfo

    if (!hasNextPage || (endCursor == null)) return

    const newVariables: SuggestedFragrancesQueryVariables = {
      ...variables,
      input: {
        pagination: {
          ...variables.input?.pagination,
          after: endCursor
        }
      }
    }

    void fetchMore({
      variables: newVariables,
      updateQuery: (prev, { fetchMoreResult }) => {
        const c1 = prev.fragrances
        const c2 = fetchMoreResult.fragrances

        if (c1 == null) return fetchMoreResult
        if (c2 == null) return prev

        return {
          fragrances: {
            edges: c1.edges.concat(c2.edges),
            pageInfo: c2.pageInfo
          }
        }
      }
    })
  }, [data, variables, fetchMore])

  const refresh = useCallback(() => {
    void refetch(variables)
  }, [variables, refetch])

  const fragrances = useMemo<FlattendedSuggestedFragrancesData['fragrances']>(() =>
    flattenConnection(data?.fragrances).map(fragrance => ({
      ...fragrance,
      images: flattenConnection(fragrance.images)
    })),
  [data?.fragrances])

  return {
    data: fragrances,
    pageInfo: data?.fragrances.pageInfo,

    error,
    loading,

    getMore,
    refresh
  }
}

export default useSuggestedFragrances
