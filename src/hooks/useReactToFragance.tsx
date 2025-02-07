import { gql } from '@apollo/client/core'
import { useMutation } from '@apollo/client'
import { FragranceReaction, FragranceReactionType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useCallback } from 'react'

const REACT_TO_FRAGRANCE = gql`
  mutation ReactToFragrance($fragranceId: Int!, $reaction: FragranceReactionType!, $myReaction: Boolean) {
    reactToFragrance(fragranceId: $fragranceId, reaction: $reaction, myReaction: $myReaction) {
      myReaction
      reaction
    }
  }
`

interface ReactToFragranceArgs {
  fragranceId: number
  reaction: FragranceReactionType
  myReaction: boolean | null
}

interface ReactToFragranceData {
  reactToFragrance: FragranceReaction
}

const useReactToFragrance = () => {
  const [execute, { data, loading, error }] = useMutation<ReactToFragranceData, ReactToFragranceArgs>(REACT_TO_FRAGRANCE)

  const reactToFragrance = useCallback(async (variables: ReactToFragranceArgs) => {
    try {
      const res = await execute({ variables })
    } catch (error) {
      console.log(error)
    }
  }, [execute])

  return {
    reaction: data?.reactToFragrance,
    error,
    loading,

    reactToFragrance
  }
}

export default useReactToFragrance
