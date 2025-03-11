import { useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { graphql } from '../generated'
import { type FragranceNotesLayerQuery, type FragranceNotesLayerQueryVariables, NoteLayer } from '../generated/graphql'
import { flattenConnection, type FlattenType, type PaginatedQueryHookReturn } from '../common/util-types'

const NOTES_LIMIT = 30

const FRAGRANCE_NOTES_LAYER_QUERY = graphql(/* GraphQL */ `
  query FragranceNotesLayer(
    $fragranceId: Int!
    $includeTop: Boolean = false
    $includeMiddle: Boolean = false
    $includeBase: Boolean = false
    $notesInput: NotesInput = {
      pagination: {
        first: 30
        sort: {
          by: votes
        }
      }
      fill: false
    }
  ) {
    fragrance(id: $fragranceId) {
      id
      notes {
        top(input: $notesInput) @include(if: $includeTop) {
          edges {
            node {
              id
              noteId
              name
              icon
              layer
              votes
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
        middle(input: $notesInput) @include(if: $includeMiddle) {
          edges {
            node {
              id
              noteId
              name
              icon
              layer
              votes
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
        base(input: $notesInput) @include(if: $includeBase) {
          edges {
            node {
              id
              noteId
              name
              icon
              layer
              votes
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
      }
    }
  }
`)

type FragranceNotesData = Pick<NonNullable<FragranceNotesLayerQuery['fragrance']>['notes'], 'top' | 'middle' | 'base'>
export type FlattenedFragranceNotesLayerQuery = FlattenType<FragranceNotesData>

const useFragranceNotesLayer = (fragranceId: number, layer: NoteLayer): PaginatedQueryHookReturn<NonNullable<FlattenedFragranceNotesLayerQuery['base']>> => {
  const key = useMemo<keyof FragranceNotesData>(() => layer.toLowerCase() as keyof FragranceNotesData, [layer])
  const variables = useMemo<FragranceNotesLayerQueryVariables>(() => ({
    fragranceId,
    notesInput: {
      pagination: {
        first: NOTES_LIMIT
      },
      fill: true
    },
    includeTop: layer === NoteLayer.Top,
    includeMiddle: layer === NoteLayer.Middle,
    includeBase: layer === NoteLayer.Base
  }), [fragranceId, layer])

  const { data, loading, error, fetchMore, refetch } = useQuery(FRAGRANCE_NOTES_LAYER_QUERY, { variables })

  const getMore = useCallback(() => {
    if (data?.fragrance == null) return

    const pageInfo = data.fragrance.notes[key]?.pageInfo
    if (pageInfo == null) return

    const { hasNextPage, endCursor } = pageInfo

    if (!hasNextPage || (endCursor == null)) return

    const newVariables: FragranceNotesLayerQueryVariables = {
      ...variables,
      notesInput: {
        pagination: {
          ...variables.notesInput?.pagination,
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

        const pNotes = c1.notes[key]
        const nNotes = c2.notes[key]

        if ((pNotes == null) && (nNotes == null)) return prev
        if (pNotes == null) return fetchMoreResult
        if (nNotes == null) return prev

        return {
          fragrance: {
            ...c1,
            notes: {
              [key]: {
                edges: pNotes.edges.concat(nNotes.edges),
                pageInfo: nNotes.pageInfo
              }
            }
          }
        }
      }
    })
  }, [data, key, variables, fetchMore])

  const refresh = useCallback(() => {
    void refetch(variables)
  }, [variables, refetch])

  const notes = useMemo<NonNullable<FlattenedFragranceNotesLayerQuery['base']>>(() =>
    flattenConnection(data?.fragrance?.notes[key])
  , [data?.fragrance?.notes, key])

  return {
    data: notes,
    pageInfo: data?.fragrance?.notes[key]?.pageInfo,
    loading,
    error,

    refresh,
    getMore
  }
}

export default useFragranceNotesLayer
