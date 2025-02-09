import { Fragrance, FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_LIMIT = 30
const DEFAULT_OFFSET = 0
const DEFAULT_FILL = false

const FRAGRANCE_ACCORDS_QUERY = gql`
  query FragranceAccords($id: Int!, $limit: Int, $offset: Int, $fill: Boolean) {
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
`

export interface FragranceAccordsVars {
  id: number
  limit?: number | undefined
  offset?: number | undefined
  fill?: boolean | undefined
}

interface FragranceAccordsData {
  fragrance: Fragrance
}

const VOTE_ON_ACCORD = gql`
  mutation VoteOnAccord($fragranceId: Int!, $accordId: Int!, $myVote: Boolean!) {
    voteOnAccord(fragranceId: $fragranceId, accordId: $accordId, myVote: $myVote) {
      id
      votes
      myVote
    }
  }
`

export interface VoteOnAccordVars {
  fragranceId: number
  accordId: number
  myVote: boolean
}

export interface VoteOnAccordData {
  voteOnAccord: FragranceAccord
}

const useFragranceAccords = (variables: FragranceAccordsVars) => {
  const localVariables = useRef({
    id: variables.id,
    limit: variables.limit ?? DEFAULT_LIMIT,
    offset: variables.offset ?? DEFAULT_OFFSET,
    fill: variables.fill ?? DEFAULT_FILL
  })

  const {
    data,
    loading: accordsLoading,
    error: accordsError,
    refetch,
    fetchMore
  } = useQuery<FragranceAccordsData, FragranceAccordsVars>(FRAGRANCE_ACCORDS_QUERY, { variables: localVariables.current })

  accordsError && console.log(accordsError)

  const [voteOnAccordMutation, {
    loading: voteLoading,
    error: voteError
  }] = useMutation<VoteOnAccordData, VoteOnAccordVars>(VOTE_ON_ACCORD)

  const [hasMore, setHasMore] = useState(true)

  const voteOnAccord = useCallback((variables: VoteOnAccordVars, accord: FragranceAccord) => {
    const curVotes = accord.votes

    return voteOnAccordMutation({
      variables,
      optimisticResponse: {
        voteOnAccord: {
          ...accord,
          votes: variables.myVote ? curVotes + 1 : curVotes - 1,
          myVote: variables.myVote
        }
      }
    })
  }, [voteOnAccordMutation])

  const refresh = useCallback((variables: FragranceAccordsVars) => {
    localVariables.current.offset = 0
    refetch(variables)
  }, [refetch])

  const getMore = useCallback(() => {
    if (!hasMore) return
    const { offset, limit } = localVariables.current

    const nextOffset = offset + limit
    localVariables.current.offset = nextOffset

    fetchMore({
      variables: { offset: nextOffset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const oldAccords = prev.fragrance?.accords || []
        const newAccords = fetchMoreResult.fragrance?.accords || []

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
    accords: data?.fragrance.accords || [],
    loading: { accordsLoading, voteLoading },
    errors: { accordsError, voteError },
    hasMore,

    refresh,
    getMore,
    voteOnAccord
  }
}

export default useFragranceAccords
