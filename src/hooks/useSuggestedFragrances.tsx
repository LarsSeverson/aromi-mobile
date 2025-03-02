import { useCallback, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { graphql } from '../generated'
import { type SuggestedFragrancesQueryVariables } from '../generated/graphql'
import { type NonNullableVariables } from '../common/util-types'

const SUGGESTED_FRAGRANCES_QUERY = graphql(/* GraphQL */ `
  query SuggestedFragrances(
    $limit: Int = 10, 
    $offset: Int = 0, 
    $imagesLimit: Int = 1,
    $imagesOffset: Int = 0) {
    fragrances(limit: $limit, offset: $offset) {
      id
      brand
      name

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
    }
  }
`)

const useSuggestedFragrances = (variables: SuggestedFragrancesQueryVariables = {}) => {
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch
  } = useQuery(SUGGESTED_FRAGRANCES_QUERY, { variables })

  const localVariables = useRef<NonNullableVariables<SuggestedFragrancesQueryVariables>>({
    limit: variables.limit ?? 10,
    offset: variables.offset ?? 0,
    imagesLimit: variables.imagesLimit ?? 1,
    imagesOffset: variables.imagesOffset ?? 0
  })

  const [hasMore, setHasMore] = useState(true)

  const refresh = useCallback((variables: SuggestedFragrancesQueryVariables = localVariables.current) => {
    localVariables.current = {
      limit: variables.limit ?? 10,
      offset: 0,
      imagesLimit: variables.imagesLimit ?? 1,
      imagesOffset: variables.imagesOffset ?? 0
    }
    void refetch(localVariables.current)
  }, [refetch])

  const getMore = useCallback(() => {
    if (!hasMore) return

    const { offset, limit } = localVariables.current
    const nextOffset = offset + limit
    localVariables.current.offset = nextOffset

    void fetchMore({
      variables: { offset: nextOffset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (prev.fragrances == null) return fetchMoreResult
        if (fetchMoreResult.fragrances == null) return prev

        if (fetchMoreResult.fragrances.length < localVariables.current.limit) {
          setHasMore(false)
        }

        return {
          fragrances: [
            ...prev.fragrances,
            ...fetchMoreResult.fragrances
          ]
        }
      }
    })
  }, [hasMore, fetchMore])

  return {
    suggestedFragrances: data?.fragrances ?? [],

    error,
    loading,

    hasMore,

    getMore,
    refresh
  }
}

export default useSuggestedFragrances
