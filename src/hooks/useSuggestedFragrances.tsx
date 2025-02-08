import { useCallback, useEffect, useRef, useState } from 'react'
import { gql } from '@apollo/client/core'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useQuery } from '@apollo/client'

const DEFAULT_LIMIT = 20
const DEFAULT_OFFSET = 0
const DEFAULT_IMGS_LIMIT = 1

const SUGGESTED_FRAGRANCES_QUERY = gql`
  query SuggestedFragrances($limit: Int, $offset: Int, $imagesLimit: Int, $imagesOffset: Int) {
    fragrances(limit: $limit, offset: $offset) {
      id
      brand
      name

      reactions {
        likes
        dislikes
      }

      myReactions {
        like
      }

      images(limit: $imagesLimit, offset: $imagesOffset) {
        id
        url
      }
    }
  }
`

export interface SuggestedFragrancesVars {
  limit?: number | undefined
  offset?: number | undefined

  imagesLimit?: number | undefined
  imagesOffset?: number | undefined
}

export interface SuggestedFragrancesData {
  fragrances: Fragrance[]
}

const useSuggestedFragrances = (variables: SuggestedFragrancesVars = {}) => {
  const localVariables = useRef({
    limit: variables.limit ?? DEFAULT_LIMIT,
    offset: variables.offset ?? DEFAULT_OFFSET,
    imagesLimit: variables.imagesLimit ?? DEFAULT_IMGS_LIMIT,
    imagesOffset: variables.imagesOffset ?? DEFAULT_OFFSET
  })

  const {
    data,
    loading,
    error,
    fetchMore,
    refetch
  } = useQuery<SuggestedFragrancesData, SuggestedFragrancesVars>(SUGGESTED_FRAGRANCES_QUERY, { variables: localVariables.current })

  const [hasMore, setHasMore] = useState(true)

  const refresh = useCallback(() => {
    localVariables.current.offset = 0
    refetch(localVariables.current)
  }, [refetch])

  const getMore = useCallback(() => {
    const nextOffset = localVariables.current.offset + localVariables.current.limit

    localVariables.current.offset = nextOffset

    fetchMore({
      variables: { offset: localVariables.current.offset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        return {
          fragrances: [
            ...prev.fragrances,
            ...fetchMoreResult.fragrances
          ]
        }
      }
    })
  }, [fetchMore])

  useEffect(() => {
    if (data?.fragrances) {
      setHasMore(data.fragrances.length === localVariables.current.limit)
    }
  }, [data])

  return {
    suggestedFragrances: data?.fragrances || [],

    error,
    loading,

    hasMore,

    getMore,
    refresh
  }
}

export default useSuggestedFragrances
