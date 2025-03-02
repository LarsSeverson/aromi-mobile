import { useQuery } from '@apollo/client'
import { useCallback, useRef, useState } from 'react'
import { graphql } from '../generated'
import { type FragranceAccordsQueryVariables } from '../generated/graphql'
import { type NonNullableVariables } from '../common/util-types'

const FRAGRANCE_ACCORDS_QUERY = graphql(/* GraphQL */ `
  query FragranceAccords(
    $id: Int!, 
    $limit: Int = 30, 
    $offset: Int = 0, 
    $fill: Boolean = false) {
    fragrance(id: $id) {
      id

      accords(limit: $limit, offset: $offset, fill: $fill) {
        id
        accordId
        name
        color
        votes
        myVote
      }
    }
  }
`)

const useFragranceAccords = (variables: FragranceAccordsQueryVariables) => {
  const {
    data,
    loading,
    error,
    refetch,
    fetchMore
  } = useQuery(FRAGRANCE_ACCORDS_QUERY, { variables })

  const localVariables = useRef<NonNullableVariables<FragranceAccordsQueryVariables>>({
    id: variables.id,
    fill: variables.fill ?? false,
    limit: variables.limit ?? 30,
    offset: variables.offset ?? 0
  })

  const [hasMore, setHasMore] = useState(true)

  const refresh = useCallback((variables: FragranceAccordsQueryVariables = localVariables.current) => {
    localVariables.current = {
      id: variables.id,
      fill: variables.fill ?? false,
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

        const oldAccords = prev.fragrance?.accords ?? []
        const newAccords = fetchMoreResult.fragrance?.accords ?? []

        if (newAccords.length < localVariables.current.limit) {
          setHasMore(false)
        }

        return {
          fragrance: {
            ...prev.fragrance,
            accords: [
              ...oldAccords,
              ...newAccords
            ]
          }
        }
      }
    })
  }, [hasMore, fetchMore])

  return {
    accords: data?.fragrance?.accords ?? [],
    loading,
    error,
    hasMore,

    refresh,
    getMore
  }
}

export default useFragranceAccords
