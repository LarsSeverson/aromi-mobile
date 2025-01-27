import useQuery from './useQuery'
import { FragranceAccords } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import fragranceAccords, { FragranceAccordsArgs, FragranceAccordsResult } from '../graphql/queries/fragranceAccords'
import useResolver from './useResolver'
import { FragranceAccordUserVotesArgs, fragranceAccordUserVotesQuery, FragranceAccordUserVotesResult, FragranceAccordUserVotesResults } from '../graphql/queries/fragranceAccordUserVotes'
import { useAromiAuthContext } from './useAromiAuthContext'

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
  const { userInfo } = useAromiAuthContext()

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
          userId: userInfo.user?.id,
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
  const [curAccords, setCurAccords] = useState<FragranceAccords>([])
  const [curVotes, setCurVotes] = useState(new Map<number, FragranceAccordUserVotesResult>())

  const {
    data: accords,
    loading: accordsLoading,
    error: accordsError,
    execute: getAccords,
    reset: resetAccords
  } = useResolver<FragranceAccordsResult, FragranceAccordsArgs>(
    {
      resolver: fragranceAccords,
      type: 'query',
      authMode: 'iam'
    }
  )

  const {
    loading: votesLoading,
    error: votesError,
    execute: getVotes,
    reset: resetVotes
  } = useResolver<FragranceAccordUserVotesResults, FragranceAccordUserVotesArgs>(
    {
      resolver: fragranceAccordUserVotesQuery,
      type: 'query',
      authMode: 'userPool'
    }
  )

  const searchByName = useCallback((name: string) => {
    accordVars.current.name = name
    accordVars.current.offset = 0

    resetAccords()

    getAccords(accordVars.current)
  }, [resetAccords, getAccords])

  const getMore = useCallback(() => {
    const nextOffset = accordVars.current.offset + accordVars.current.limit

    accordVars.current.offset = nextOffset

    getAccords(accordVars.current)
  }, [getAccords])

  const updateCurrentAccords = useCallback((accords: FragranceAccords) => {
    const replace = accordVars.current.offset === 0

    replace
      ? setCurAccords(accords)
      : setCurAccords((prev) => [...(prev || []), ...accords])
  }, [])

  const updateCurrentVotes = useCallback(async (accords: FragranceAccords) => {
    if (!votesVars.current) return

    const fragranceAccordIds = accords.map(accord => accord.fragranceId)

    votesVars.current.fragranceAccordIds = fragranceAccordIds

    const votesData = await getVotes(votesVars.current)

    if (!(votesData?.fragranceAccordUserVotesResults)) return

    const votes = votesData.fragranceAccordUserVotesResults

    setCurVotes((prev) => {
      votes.forEach(vote => prev.set(vote.fragranceAccordId, vote))

      return new Map(prev)
    })
  }, [getVotes])

  const onAccordsChanged = useCallback((accords?: FragranceAccords | undefined) => {
    if (!accords) return

    updateCurrentAccords(accords)
    updateCurrentVotes(accords)

    setNoResults(accords.length === 0)
    setHasMore(accords.length >= accordVars.current.limit)
  }, [updateCurrentAccords, updateCurrentVotes])

  const refresh = useCallback(() => {
    resetAccords()
    resetVotes()
  }, [resetAccords, resetVotes])

  useEffect(() => {
    onAccordsChanged(accords?.fragranceAccords)
  }, [accords, onAccordsChanged])

  useEffect(() => {
    setError({ accords: accordsError !== null, votes: votesError !== null })
  }, [accordsError, votesError])

  useEffect(() => {
    setLoading({ accords: accordsLoading, votes: votesLoading })
  }, [accordsLoading, votesLoading])

  return useMemo(() => ({
    accords: curAccords,
    votes: curVotes,

    error,
    loading,

    noResults,
    hasMore,

    refresh,
    searchByName,
    getMore
  }),
  [
    curVotes,
    curAccords,
    error, loading,
    noResults, hasMore,
    refresh, searchByName, getMore
  ])
}

export default useFragranceAccords
