import { useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { graphql } from '../generated'
import { type FragranceAccordsQueryVariables, type FragranceAccordsQuery, SortBy } from '../generated/graphql'
import { flattenConnection, type FlattenType, type PaginatedQueryHookReturn } from '../common/util-types'

const ACCORDS_LIMIT = 30

const FRAGRANCE_ACCORDS_QUERY = graphql(/* GraphQL */ `
  query FragranceAccords(
    $fragranceId: Int!
    $accordsInput: AccordsInput = {
      pagination: {
        first: 30 
        sort: {
          by: votes
        }
      }
      fill: true
    }
  ) {
    fragrance(id: $fragranceId) {
      id
      accords(input: $accordsInput) {
        edges {
          node {
            id
            accordId
            name
            color
            votes
            myVote
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`)

export type FlattenedFragranceAccordsQuery = FlattenType<NonNullable<FragranceAccordsQuery['fragrance']>>

const useFragranceAccords = (fragranceId: number): PaginatedQueryHookReturn<FlattenedFragranceAccordsQuery['accords']> => {
  const variables = useMemo<FragranceAccordsQueryVariables>(() => ({
    fragranceId,
    accordsInput: {
      pagination: {
        first: ACCORDS_LIMIT,
        sort: { by: SortBy.Votes }
      },
      fill: true
    }
  }), [fragranceId])

  const { data, loading, error, refetch, fetchMore } = useQuery(FRAGRANCE_ACCORDS_QUERY, { variables })

  const getMore = useCallback(() => {
    if (data?.fragrance == null) return

    const pageInfo = data.fragrance.accords.pageInfo
    const { hasNextPage, endCursor } = pageInfo

    if (!hasNextPage || (endCursor == null)) return

    const newVariables: FragranceAccordsQueryVariables = {
      ...variables,
      accordsInput: {
        pagination: {
          ...variables.accordsInput?.pagination,
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
            accords: {
              edges: c1.accords.edges.concat(c2.accords.edges),
              pageInfo: c2.accords.pageInfo
            }
          }
        }
      }
    })
  }, [data, variables, fetchMore])

  const refresh = useCallback(() => {
    void refetch(variables)
  }, [variables, refetch])

  const accords = useMemo<FlattenedFragranceAccordsQuery['accords']>(() =>
    flattenConnection(data?.fragrance?.accords),
  [data?.fragrance?.accords])

  return {
    data: accords,
    pageInfo: data?.fragrance?.accords.pageInfo,
    loading,
    error,

    refresh,
    getMore
  }
}

export default useFragranceAccords
