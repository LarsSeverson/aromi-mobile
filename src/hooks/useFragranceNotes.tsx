import { Fragrance, FragranceNote, NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useCallback, useRef, useState } from 'react'

const DEFAULT_LIMIT = 12
const DEFAULT_OFFSET = 0
const DEFAULT_FILL = false

const FRAGRANCE_NOTES_QUERY = gql`
  query FragranceNotes(
    $id: Int!, 
    $limit: Int, 
    $offset: Int, 
    $fill: Boolean,
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
`

export interface FragranceNotesVars {
  id: number
  limit?: number | undefined
  offset?: number | undefined
  fill?: boolean | undefined

  includeTop: boolean
  includeMiddle: boolean
  includeBase: boolean
}

interface FragranceNotesData {
  fragrance: Fragrance
}

const VOTE_ON_NOTE = gql`
  mutation VoteOnNote($fragranceId: Int!, $noteId: Int!, $layer: NoteLayer!, $myVote: Boolean!) {
    voteOnNote(fragranceId: $fragranceId, noteId: $noteId, layer: $layer, myVote: $myVote) {
      id
      noteId
      name
      layer
      votes
      myVote
    }
  }
`

export interface VoteOnNoteVars {
  fragranceId: number
  noteId: number
  layer: NoteLayerType
  myVote: boolean
}

export interface VoteOnNoteData {
  voteOnNote: FragranceNote
}

export interface UseFragranceNotesVars {
  id: number
  layers: NoteLayerType[]
  fill?: boolean | undefined
  limit?: number | undefined
  offset?: number | undefined
}

const useFragranceNotes = (vars: UseFragranceNotesVars) => {
  const {
    id,
    layers,
    fill,
    limit,
    offset
  } = vars

  const includeTop = layers.includes(NoteLayerType.TOP)
  const includeMiddle = layers.includes(NoteLayerType.MIDDLE)
  const includeBase = layers.includes(NoteLayerType.BASE)

  const localVariables = useRef({
    id,
    limit: limit ?? DEFAULT_LIMIT,
    offset: offset ?? DEFAULT_OFFSET,
    fill: fill ?? DEFAULT_FILL,
    includeTop,
    includeMiddle,
    includeBase
  })

  const {
    data,
    loading: notesLoading,
    error: notesError,
    refetch,
    fetchMore
  } = useQuery<FragranceNotesData, FragranceNotesVars>(FRAGRANCE_NOTES_QUERY, { variables: localVariables.current })

  const [voteOnNoteMutation, {
    loading: voteLoading,
    error: voteError
  }] = useMutation<VoteOnNoteData, VoteOnNoteVars>(VOTE_ON_NOTE)

  const [hasMore, setHasMore] = useState({ top: true, middle: true, base: true })

  const voteOnNote = useCallback((variables: VoteOnNoteVars, note: FragranceNote) => {
    const curVotes = note.votes

    return voteOnNoteMutation({
      variables,
      optimisticResponse: {
        voteOnNote: {
          ...note,
          votes: variables.myVote ? curVotes + 1 : curVotes - 1,
          myVote: variables.myVote
        }
      }
    })
  }, [voteOnNoteMutation])

  const refresh = useCallback((variables: FragranceNotesVars) => {
    localVariables.current.offset = 0
    refetch(variables)
  }, [refetch])

  const getMore = useCallback(() => {
    const { offset, limit, includeTop, includeMiddle, includeBase } = localVariables.current
    const canFetch =
      (includeTop ? hasMore.top : false) ||
      (includeMiddle ? hasMore.middle : false) ||
      (includeBase ? hasMore.base : false)
    if (!canFetch) return

    const nextOffset = offset + limit
    localVariables.current.offset = nextOffset

    fetchMore({
      variables: { offset: nextOffset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const oldTopNotes = prev.fragrance.notes.top || []
        const oldMiddleNotes = prev.fragrance.notes.middle || []
        const oldBaseNotes = prev.fragrance.notes.base || []

        const newTopNotes = includeTop ? fetchMoreResult.fragrance.notes.top || [] : []
        const newMiddleNotes = includeMiddle ? fetchMoreResult.fragrance.notes.middle || [] : []
        const newBaseNotes = includeBase ? fetchMoreResult.fragrance.notes.base || [] : []

        setHasMore({
          top: includeTop ? newTopNotes.length > 0 : false,
          middle: includeMiddle ? newMiddleNotes.length > 0 : false,
          base: includeBase ? newBaseNotes.length > 0 : false
        })

        return {
          fragrance: {
            ...prev.fragrance,
            notes: {
              top: includeTop ? [...oldTopNotes, ...newTopNotes] : oldTopNotes,
              middle: includeMiddle ? [...oldMiddleNotes, ...newMiddleNotes] : oldMiddleNotes,
              base: includeBase ? [...oldBaseNotes, ...newBaseNotes] : oldBaseNotes
            }
          }
        }
      }
    })
  }, [hasMore, fetchMore])

  notesError && console.log(notesError)

  return {
    notes: data?.fragrance.notes,
    loading: { notesLoading, voteLoading },
    errors: { notesError, voteError },
    hasMore,

    refresh,
    getMore,
    voteOnNote
  }
}

export default useFragranceNotes
