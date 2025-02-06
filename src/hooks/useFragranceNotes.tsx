import { FragranceNote, FragranceNotes, NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'

const DEFAULT_LIMIT = 30
const DEFAULT_OFFSET = 0

const DEFAULT_FILL = false
const DEFAULT_QUERY_ON_LOAD = true
const DEFAULT_WITH_VOTES = true

const DEFAULT_NAME = ''

export interface UseFragranceNotesArgs {
  fragranceId: number
  limit?: number | undefined
  offset?: number | undefined

  name?: string | undefined

  fill?: boolean | undefined
  queryOnLoad?: boolean | undefined
  withVotes?: boolean | undefined

  layer: NoteLayerType
}

interface NotesVars {
  id: number
  limit: number
  offset: number

  fill: boolean

  name: string

  layer: NoteLayerType
}

interface VotesVars {
  userId: number
  limit: number
  offset: number

  fragranceNoteIds: number[]
}

const useFragranceNotes = (args: UseFragranceNotesArgs) => {
  // const { userInfo } = useAuthContext()

  // const {
  //   fragranceId,
  //   limit = DEFAULT_LIMIT,
  //   offset = DEFAULT_OFFSET,

  //   name = DEFAULT_NAME,

  //   fill = DEFAULT_FILL,
  //   queryOnLoad = DEFAULT_QUERY_ON_LOAD,
  //   withVotes = DEFAULT_WITH_VOTES,

  //   layer
  // } = args

  // const notesVars = useRef<NotesVars>(
  //   {
  //     id: fragranceId,
  //     limit,
  //     offset,
  //     fill,
  //     name,
  //     layer
  //   }
  // )

  // const votesVars = useRef<VotesVars>(
  //   userInfo.user
  //     ? {
  //         userId: userInfo.user.id,
  //         fragranceNoteIds: [],
  //         limit,
  //         offset: 0
  //       }
  //     : null
  // )

  // const [noResults, setNoResults] = useState(false)
  // const [hasMore, setHasMore] = useState(true)

  // const [loading, setLoading] = useState({ notes: false, votes: false })
  // const [error, setError] = useState({ notes: false, votes: false })

  // const [curNotes, setCurNotes] = useState<FragranceNotes | null>(null)
  // const [curVotes, setCurVotes] = useState<Map<number, FragranceNoteUserVotesResult> | null>(null)

  // const {
  //   data: notes,
  //   loading: notesLoading,
  //   error: notesError,
  //   execute: getNotes,
  //   reset: resetNotes
  // } = useResolver<FragranceNotesResult, FragranceNotesArgs>(
  //   {
  //     resolver: fragranceNotes,
  //     type: 'query',
  //     authMode: 'iam'
  //   }
  // )

  // const {
  //   data: votes,
  //   loading: votesLoading,
  //   error: votesError,
  //   execute: getVotes,
  //   reset: resetVotes
  // } = useResolver<FragranceNoteUserVotesResults, FragranceNoteUserVotesArgs>(
  //   {
  //     resolver: fragranceNoteUserVotesQuery,
  //     type: 'query',
  //     authMode: 'userPool'
  //   }
  // )

  // const {
  //   execute: voteOnNote
  // } = useResolver<VoteOnAccordMutationResult, VoteOnNoteMutationArgs>(
  //   {
  //     resolver: voteOnNoteMutation,
  //     type: 'mutation',
  //     authMode: 'userPool'
  //   }
  // )

  // const refresh = useCallback(() => {
  //   notesVars.current.name = ''
  //   notesVars.current.offset = 0

  //   resetNotes()
  //   resetVotes()

  //   setNoResults(false)
  //   setHasMore(true)
  // }, [resetNotes, resetVotes])

  // const searchByName = useCallback((name: string) => {
  //   refresh()

  //   notesVars.current.name = name

  //   getNotes(notesVars.current)
  // }, [refresh, getNotes])

  // const getMore = useCallback(() => {
  //   const nextOffset = notesVars.current.offset + notesVars.current.limit

  //   notesVars.current.offset = nextOffset

  //   getNotes(notesVars.current)
  // }, [getNotes])

  // const updateCurrentNotes = useCallback((notes: FragranceNotes) => {
  //   const replace = notesVars.current.offset = 0

  //   replace
  //     ? setCurNotes(notes)
  //     : setCurNotes((prev) => [...(prev || []), ...notes])
  // }, [])

  // const updateCurrentVotes = useCallback(async (notes: FragranceNotes) => {
  //   if (!votesVars.current) return

  //   const fragranceNoteIds = notes.map(note => note.id)

  //   votesVars.current.fragranceNoteIds = fragranceNoteIds

  //   const votesData = await getVotes(votesVars.current)
  //   const votes = votesData?.fragranceNoteUserVotes || null

  //   if (!votes) return

  //   setCurVotes((prev) => {
  //     if (!prev) prev = new Map<number, FragranceNoteUserVotesResult>()

  //     votes.filter(vote => vote.deletedAt === null).forEach(vote => prev?.set(vote.fragranceNoteId, vote))

  //     return new Map(prev)
  //   })
  // }, [getVotes])

  // const onNotesChanged = useCallback((notes?: FragranceNotes | undefined) => {
  //   if (!notes || !hasMore) return

  //   withVotes && updateCurrentVotes(notes)
  //   updateCurrentNotes(notes)

  //   setNoResults(notes.length === 0)
  //   setHasMore(notes.length >= notesVars.current.limit)
  // }, [hasMore, withVotes, updateCurrentVotes, updateCurrentNotes])

  // const vote = useCallback((_: number, fragranceNote: FragranceNote) => {
  //   if (!userInfo.user) return

  //   const fragranceId = notesVars.current.id
  //   const noteId = fragranceNote.noteId
  //   const layer = notesVars.current.layer

  //   voteOnNote({ fragranceId, noteId, layer })
  // }, [userInfo.user, voteOnNote])

  // useEffect(() => {
  //   onNotesChanged(notes?.fragranceNotes)
  // }, [notes, onNotesChanged])

  // useEffect(() => {
  //   setError({ notes: notesError !== null, votes: votesError !== null })
  // }, [notesError, votesError])

  // useEffect(() => {
  //   setLoading({ notes: notesLoading, votes: votesLoading })
  // }, [notesLoading, votesLoading])

  // useEffect(() => {
  //   if (!queryOnLoad) return

  //   const init = async () => {
  //     !notes && await getNotes(notesVars.current)

  //     if (withVotes && notes && votesVars.current) {
  //       !votes && await getVotes(votesVars.current)
  //     }
  //   }

  //   init()
  // }, [queryOnLoad, notes, withVotes, votes, getNotes, getVotes])

  return {
    // notes: curNotes,
    // votes: curVotes,

    // error,
    // loading,

    // noResults,
    // hasMore,

    // searchByName,
    // getMore,
    // vote,
    // refresh
  }
}

export default useFragranceNotes
