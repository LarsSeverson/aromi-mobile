import { Fragrance, FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useCallback, useRef } from 'react'

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
  const localVariables = useRef<FragranceAccordsVars>({
    id: variables.id,
    limit: variables.limit ?? DEFAULT_LIMIT,
    offset: variables.offset ?? DEFAULT_OFFSET,
    fill: variables.fill ?? DEFAULT_FILL
  })

  const {
    data,
    loading: accordsLoading,
    error: accordsError,
    refetch
  } = useQuery<FragranceAccordsData, FragranceAccordsVars>(FRAGRANCE_ACCORDS_QUERY, { variables: localVariables.current })

  const [execute, {
    loading: voteLoading,
    error: voteError
  }] = useMutation<FragranceAccordsData, FragranceAccordsVars>(VOTE_ON_ACCORD)

  const refresh = useCallback((variables: FragranceAccordsVars) => {
    refetch(variables)
  }, [refetch])

  return {
    accords: data?.fragrance.accords || [],
    loading,
    error,
    refresh
  }
}

export default useFragranceAccords
