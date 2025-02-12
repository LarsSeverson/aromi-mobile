import { Fragrance, FragranceVote } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useCallback, useRef } from 'react'
import useVoteOnFragrance from './useVoteOnFragrance'

const FRAGRANCE_QUERY = gql`
  query Fragrance(
    $id: Int!, 
    $imagesLimit: Int, 
    $imagesOffset: Int,
    $notesLimit: Int,
    $notesOffset: Int,
    $notesFill: Boolean,
    $accordsLimit: Int,
    $accordsOffset: Int,
    $accordsFill: Boolean) {
    fragrance(id: $id) {
      id
      brand
      name
      rating
      reviews

      vote {
        id
        likes
        dislikes
        myVote
      }

      images(limit: $imagesLimit, offset: $imagesOffset) {
        id
        url
      }

      traits {
        gender {
          trait
          value
          myVote
        }
        longevity {
          trait
          value
        }
        sillage {
          trait
          value
        }
        complexity {
          trait
          value
        }
        balance {
          trait
          value
        }
        allure {
          trait
          value
        }
      }

      notes {
        top(limit: $notesLimit, offset: $notesOffset, fill: $notesFill) {
          id
          name
          votes
          myVote
        }
        middle(limit: $notesLimit, offset: $notesOffset, fill: $notesFill) {
          id
          name
          votes
          myVote
        }
        base(limit: $notesLimit, offset: $notesOffset, fill: $notesFill) {
          id
          name
          votes
          myVote
        }
      }

      accords(limit: $accordsLimit, offset: $accordsOffset, fill: $accordsFill) {
        id
        name
        color
        votes
        myVote
      }
    }
  }
`

export interface FragranceVars {
  id: number

  imagesLimit?: number | undefined
  imagesOffset?: number | undefined
  notesLimit?: number | undefined
  notesOffset?: number | undefined
  accordsLimit?: number | undefined
  accordsOffset?: number | undefined

  notesFill?: boolean | undefined
  accordsFill?: boolean | undefined
}

export interface FragranceData {
  fragrance: Fragrance
}

const useFragrance = (variables: FragranceVars) => {
  const localVariables = useRef<FragranceVars>({
    id: variables.id,
    imagesLimit: variables.imagesLimit ?? 10,
    imagesOffset: variables.imagesOffset ?? 0,
    notesLimit: variables.notesLimit ?? 8,
    notesOffset: variables.notesOffset ?? 0,
    accordsLimit: variables.accordsLimit ?? 8,
    accordsOffset: variables.accordsOffset ?? 0,
    notesFill: variables.notesFill ?? false,
    accordsFill: variables.accordsFill ?? false
  })

  const {
    data,
    loading: fragranceLoading,
    error: fragranceError,
    refetch
  } = useQuery<FragranceData, FragranceVars>(FRAGRANCE_QUERY, { variables: localVariables.current })

  const {
    loading: voteLoading,
    error: voteError,
    voteOnFragrance
  } = useVoteOnFragrance()

  const refresh = useCallback((variables: FragranceVars) => {
    refetch(variables)
  }, [refetch])

  return {
    fragrance: data?.fragrance,
    loading: { fragranceLoading, voteLoading },
    error: { fragranceError, voteError },

    refresh,
    voteOnFragrance
  }
}

export default useFragrance
