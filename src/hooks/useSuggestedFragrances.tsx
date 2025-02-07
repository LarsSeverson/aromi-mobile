import { useCallback, useEffect, useRef, useState } from 'react'
import { gql } from '@apollo/client/core'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useQuery } from '@apollo/client'

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

const BASE_LIMIT = 20
const BASE_OFFSET = 0
const BASE_IMGS_LIMIT = 1
const BASE_IMGS_OFFSET = 0

const useSuggestedFragrances = (vars: SuggestedFragrancesVars = {}) => {
  const {
    limit = BASE_LIMIT,
    offset = BASE_OFFSET,
    imagesLimit = BASE_IMGS_LIMIT,
    imagesOffset = BASE_IMGS_OFFSET
  } = vars

  const fragrancesVars = useRef({ limit, offset, imagesLimit, imagesOffset })

  const [hasMore, setHasMore] = useState(true)

  const {
    data,
    loading,
    error,
    fetchMore,
    refetch
  } = useQuery<SuggestedFragrancesData, SuggestedFragrancesVars>(SUGGESTED_FRAGRANCES_QUERY,
    {
      variables: fragrancesVars.current
    })

  const refresh = useCallback(() => {
    fragrancesVars.current.offset = 0

    refetch(fragrancesVars.current)
  }, [refetch])

  const getMore = useCallback(() => {
    const nextOffset = fragrancesVars.current.offset + fragrancesVars.current.limit

    fragrancesVars.current.offset = nextOffset

    fetchMore({
      variables: { offset: fragrancesVars.current.offset },
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
      setHasMore(data.fragrances.length === limit)
    }
  }, [data, limit])

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
