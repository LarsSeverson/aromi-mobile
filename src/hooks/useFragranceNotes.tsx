import { useQuery } from '@apollo/client'
import { useCallback, useRef, useState } from 'react'
import { graphql } from '../generated'
import { type FragranceNotesQueryVariables } from '../generated/graphql'
import { type NonNullableVariables } from '../common/util-types'

const FRAGRANCE_NOTES_QUERY = graphql(/* GraphQL */ `
  query FragranceNotes(
    $id: Int!, 
    $limit: Int = 12, 
    $offset: Int = 0, 
    $fill: Boolean = false,
    $includeTop: Boolean!,
    $includeMiddle: Boolean!,
    $includeBase: Boolean!
  ) {
    fragrance(id: $id) {
      id

      notes {
        top(limit: $limit, offset: $offset, fill: $fill) @include(if: $includeTop) {
          id
          noteId
          name
          layer
          votes
          myVote
        }
        middle(limit: $limit, offset: $offset, fill: $fill) @include(if: $includeMiddle) {
          id
          noteId
          name
          layer
          votes
          myVote
        }
        base(limit: $limit, offset: $offset, fill: $fill) @include(if: $includeBase) {
          id
          noteId
          name
          layer
          votes
          myVote
        }
      } 
    }
  }
`)

const useFragranceNotes = (variables: FragranceNotesQueryVariables) => {
  const {
    data,
    loading,
    error,
    refetch,
    fetchMore
  } = useQuery(FRAGRANCE_NOTES_QUERY, { variables })

  const localVariables = useRef<NonNullableVariables<FragranceNotesQueryVariables>>({
    id: variables.id,
    limit: variables.limit ?? 12,
    offset: variables.offset ?? 0,
    fill: variables.fill ?? false,
    includeTop: variables.includeTop,
    includeMiddle: variables.includeMiddle,
    includeBase: variables.includeBase
  })

  const [hasMore, setHasMore] = useState(true)

  const refresh = useCallback((variables: FragranceNotesQueryVariables = localVariables.current) => {
    localVariables.current = {
      id: variables.id,
      limit: variables.limit ?? 12,
      offset: 0,
      fill: variables.fill ?? false,
      includeTop: variables.includeTop,
      includeMiddle: variables.includeMiddle,
      includeBase: variables.includeBase
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

        const oldTopNotes = prev.fragrance.notes.top ?? []
        const oldMiddleNotes = prev.fragrance.notes.middle ?? []
        const oldBaseNotes = prev.fragrance.notes.base ?? []

        const { includeTop, includeMiddle, includeBase } = localVariables.current

        const newTopNotes = includeTop ? fetchMoreResult.fragrance.notes.top ?? [] : []
        const newMiddleNotes = includeMiddle ? fetchMoreResult.fragrance.notes.middle ?? [] : []
        const newBaseNotes = includeBase ? fetchMoreResult.fragrance.notes.base ?? [] : []

        const hasMoreAccords =
        (includeTop ? newTopNotes.length > 0 : true) &&
        (includeMiddle ? newMiddleNotes.length > 0 : true) &&
        (includeBase ? newBaseNotes.length > 0 : true)

        setHasMore(hasMoreAccords)

        return {
          fragrance: {
            ...prev.fragrance,
            notes: {
              top: includeTop ? oldTopNotes.concat(newTopNotes) : oldTopNotes,
              middle: includeMiddle ? oldMiddleNotes.concat(newMiddleNotes) : oldMiddleNotes,
              base: includeBase ? oldBaseNotes.concat(newBaseNotes) : oldBaseNotes
            }
          }
        }
      }
    })
  }, [hasMore, fetchMore])

  return {
    notes: data?.fragrance?.notes ?? { top: [], middle: [], base: [] },
    loading,
    error,
    hasMore,

    refresh,
    getMore
  }
}

export default useFragranceNotes
