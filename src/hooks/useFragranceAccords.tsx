import { FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'

const DEFAULT_LIMIT = 30
const DEFAULT_OFFSET = 0
const DEFAULT_NAME = ''

interface AccordsVars {
  id: number
  limit: number
  offset: number

  name: string
}

interface VotesVars {
  userId: number
  limit: number
  offset: number

  fragranceAccordIds: number[]
}

const useFragranceAccords = (fragranceId: number, limit: number = DEFAULT_LIMIT, offset: number = DEFAULT_OFFSET, name: string = DEFAULT_NAME) => {
  const { userInfo } = useAuthContext()

  const accordVars = useRef<AccordsVars>(
    {
      id: fragranceId,
      limit,
      offset,
      name
    }
  )

  const votesVars = useRef<VotesVars>(
    userInfo.user
      ? {
          userId: userInfo.user.id,
          fragranceAccordIds: [],
          limit,
          offset: 0
        }
      : null
  )

  const [noResults, setNoResults] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const [loading, setLoading] = useState({ accords: false, votes: false })
  const [error, setError] = useState({ accords: false, votes: false })

  const [curAccords, setCurAccords] = useState<FragranceAccord | null>(null)
  // const [curVotes, setCurVotes] = useState<Map<number, FragranceAccordUserVotesResult> | null>(null)

  // const {
  //   data: accords,
  //   loading: accordsLoading,
  //   error: accordsError,
  //   execute: getAccords,
  //   reset: resetAccords
  // } = useResolver<FragranceAccordsResult, FragranceAccordsArgs>(
  //   {
  //     resolver: fragranceAccords,
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
  // } = useResolver<FragranceAccordUserVotesResults, FragranceAccordUserVotesArgs>(
  //   {
  //     resolver: fragranceAccordUserVotesQuery,
  //     type: 'query',
  //     authMode: 'userPool'
  //   }
  // )

  // const {
  //   execute: voteOnAccord
  // } = useResolver<VoteOnAccordMutationResult, VoteOnAccordMutationArgs>(
  //   {
  //     resolver: voteOnAccordMutation,
  //     type: 'mutation',
  //     authMode: 'userPool'
  //   }
  // )

  // const refresh = useCallback(() => {
  //   accordVars.current.name = ''
  //   accordVars.current.offset = 0

  //   resetAccords()
  //   resetVotes()

  //   setNoResults(false)
  //   setHasMore(true)
  // }, [resetAccords, resetVotes])

  // const searchByName = useCallback((name: string) => {
  //   refresh()

  //   accordVars.current.name = name

  //   getAccords(accordVars.current)
  // }, [refresh, getAccords])

  // const getMore = useCallback(() => {
  //   const nextOffset = accordVars.current.offset + accordVars.current.limit

  //   accordVars.current.offset = nextOffset

  //   getAccords(accordVars.current)
  // }, [getAccords])

  // const updateCurrentAccords = useCallback((accords: FragranceAccords) => {
  //   const replace = accordVars.current.offset === 0

  //   replace
  //     ? setCurAccords(accords)
  //     : setCurAccords((prev) => [...(prev || []), ...accords])
  // }, [])

  // const updateCurrentVotes = useCallback(async (accords: FragranceAccords) => {
  //   if (!votesVars.current) return

  //   const fragranceAccordIds = accords.map(accord => accord.id)

  //   votesVars.current.fragranceAccordIds = fragranceAccordIds

  //   const votesData = await getVotes(votesVars.current)
  //   const votes = votesData?.fragranceAccordUserVotes || null

  //   if (!votes) return

  //   setCurVotes((prev) => {
  //     if (!prev) prev = new Map<number, FragranceAccordUserVotesResult>()

  //     votes.filter(vote => vote.deletedAt === null).forEach(vote => prev.set(vote.fragranceAccordId, vote))

  //     return new Map(prev)
  //   })
  // }, [getVotes])

  // const onAccordsChanged = useCallback((accords?: FragranceAccords | undefined) => {
  //   if (!accords || !hasMore) return

  //   updateCurrentVotes(accords)
  //   updateCurrentAccords(accords)

  //   setNoResults(accords.length === 0)
  //   setHasMore(accords.length >= accordVars.current.limit)
  // }, [hasMore, updateCurrentVotes, updateCurrentAccords])

  // const vote = useCallback((_: number, fragranceAccord: FragranceAccord) => {
  //   if (!userInfo.user) return

  //   const fragranceId = accordVars.current.id
  //   const accordId = fragranceAccord.accordId

  //   voteOnAccord({ fragranceId, accordId })
  // }, [userInfo.user, voteOnAccord])

  // useEffect(() => {
  //   onAccordsChanged(accords?.fragranceAccords)
  // }, [accords, onAccordsChanged])

  // useEffect(() => {
  //   setError({ accords: accordsError !== null, votes: votesError !== null })
  // }, [accordsError, votesError])

  // useEffect(() => {
  //   setLoading({ accords: accordsLoading, votes: votesLoading })
  // }, [accordsLoading, votesLoading])

  // useEffect(() => {
  //   const init = async () => {
  //     !accords && await getAccords(accordVars.current)

  //     if (accords && votesVars.current) {
  //       !votes && await getVotes(votesVars.current)
  //     }
  //   }

  //   init()
  // }, [accords, votes, getAccords, getVotes])

  return {
    accords: curAccords,
    // votes: curVotes,

    error,
    loading,

    noResults,
    hasMore

    // searchByName,
    // getMore,
    // vote,
    // refresh
  }
}

export default useFragranceAccords
