import { Fragrance, FragranceTrait, FragranceTraitType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useCallback } from 'react'

const FRAGRANCE_TRAITS_QUERY = gql`
  query FragranceTraits($id: Int!) {
    fragrance(id: $id) {
      id
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
    }
  }
`

export interface FragranceTraitsVars {
  id: number
}

export interface FragranceTraitsData {
  fragrance: Fragrance
}

const VOTE_ON_TRAIT = gql`
  mutation VoteOnTrait($fragranceId: Int!, $trait: FragranceTraitType!, $myVote: Float!) {
    voteOnTrait(fragranceId: $fragranceId, trait: $trait, myVote: $myVote) {
      trait
      value
      myVote
    }
  }
`

export interface VoteOnTraitVars {
  fragranceId: number
  trait: FragranceTraitType
  myVote: number
}

export interface VoteOnTraitData {
  voteOnTrait: FragranceTrait
}

const useFragranceTraits = (variables: FragranceTraitsVars) => {
  const {
    data,
    loading: traitsLoading,
    error: traitsError,
    refetch
  } = useQuery<FragranceTraitsData, FragranceTraitsVars>(FRAGRANCE_TRAITS_QUERY, { variables })

  const [execute, {
    loading: voteLoading,
    error: voteError
  }] = useMutation<VoteOnTraitData, VoteOnTraitVars>(VOTE_ON_TRAIT)

  const refresh = useCallback((variables: FragranceTraitsVars) => {
    refetch(variables)
  }, [refetch])

  return {
    fragranceTraits: data?.fragrance.traits,

    loading: { traitsLoading, voteLoading },
    error: { traitsError, voteError },

    refresh,
    voteOnTrait: execute
  }
}

export default useFragranceTraits
