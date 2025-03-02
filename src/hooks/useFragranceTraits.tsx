import { useQuery } from '@apollo/client'
import { useCallback } from 'react'
import { graphql } from '../generated'
import { type FragranceTraitsQueryVariables } from '../generated/graphql'

const FRAGRANCE_TRAITS_QUERY = graphql(/* GraphQL */ `
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
`)

const useFragranceTraits = (variables: FragranceTraitsQueryVariables) => {
  const {
    data,
    loading,
    error,
    refetch
  } = useQuery(FRAGRANCE_TRAITS_QUERY, { variables })

  const refresh = useCallback((variables?: FragranceTraitsQueryVariables) => {
    void refetch(variables)
  }, [refetch])

  return {
    traits: data?.fragrance?.traits,

    loading,
    error,

    refresh
  }
}

export default useFragranceTraits
