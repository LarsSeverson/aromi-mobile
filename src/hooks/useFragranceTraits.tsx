import { useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { graphql } from '../generated'
import { type FragranceTraitsQueryVariables } from '../generated/graphql'

const FRAGRANCE_TRAITS_QUERY = graphql(/* GraphQL */ `
  query FragranceTraits($fragranceId: Int!) {
    fragrance(id: $fragranceId) {
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

const useFragranceTraits = (fragranceId: number) => {
  const variables = useMemo<FragranceTraitsQueryVariables>(() => ({
    fragranceId
  }), [fragranceId])

  const { data, loading, error, refetch } = useQuery(FRAGRANCE_TRAITS_QUERY, { variables })

  const refresh = useCallback(() => {
    void refetch(variables)
  }, [variables, refetch])

  return {
    data: data?.fragrance?.traits,
    loading,
    error,

    refresh
  }
}

export default useFragranceTraits
