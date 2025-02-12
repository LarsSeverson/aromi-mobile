import { Fragrance, FragranceTrait, FragranceTraitType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useCallback } from 'react'

const FRAGRANCE_TRAITS_QUERY = gql`
  query FragranceTraits($id: Int!) {
    fragrance(id: $id) {
      id
      traits {
        gender {
          id
          trait
          value
          myVote
        }
        longevity {
          id
          trait
          value
          myVote
        }
        sillage {
          id
          trait
          value
          myVote
        }
        complexity {
          id
          trait
          value
          myVote
        }
        balance {
          id
          trait
          value
          myVote
        }
        allure {
          id
          trait
          value
          myVote
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
      id
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

  const [voteOnTraitMutation, {
    loading: voteLoading,
    error: voteError
  }] = useMutation<VoteOnTraitData, VoteOnTraitVars>(VOTE_ON_TRAIT)

  const voteOnTrait = useCallback((variables: VoteOnTraitVars, trait: FragranceTrait) => {
    return voteOnTraitMutation({
      variables,
      optimisticResponse: {
        voteOnTrait: {
          ...trait,
          myVote: variables.myVote
        }
      }
    })
  }, [voteOnTraitMutation])

  const refresh = useCallback((variables: FragranceTraitsVars) => {
    refetch(variables)
  }, [refetch])

  return {
    fragranceTraits: data?.fragrance.traits,

    loading: { traitsLoading, voteLoading },
    error: { traitsError, voteError },

    refresh,
    voteOnTrait
  }
}

export default useFragranceTraits
