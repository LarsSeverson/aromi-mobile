import { useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { graphql } from '../generated'
import { flattenConnection, INVALID_ID, type FlattenType } from '../common/util-types'
import { type FragranceQuery } from '../generated/graphql'

/*
const IMAGES_LIMIT = 4
const NOTES_LIMIT = 7
const ACCORDS_LIMIT = 7
const REVIEWS_LIMIT = 9
*/

const FRAGRANCE_QUERY = graphql(/* GraphQL */ `
  query Fragrance(
    $fragranceId: Int!
    $imagesInput: QueryInput = {
      pagination: {
        first: 5 
      }
    }
    $accordsInput: AccordsInput = {
      pagination: {
        first: 8,
        sort: {
          by: votes
        }
      }
    }
    $notesInput: NotesInput = {
      pagination: {
        first: 8,
        sort: {
          by: votes
        }
      }
    }
    $reviewsInput: QueryInput = {
      pagination: {
        first: 10,
        sort: {
          by: votes
        }
      }
    }
  ) {
    fragrance(id: $fragranceId) {
      id
      brand
      name
      rating
      reviewsCount

      votes {
        id
        likes
        dislikes
        myVote
      }

      images(input: $imagesInput) {
        edges {
          node {
            id
            url
          }
        }
      }

      traits {
        gender {
          id
          value
          trait
          myVote
        }
        longevity {
          id
          value
          trait
          myVote
        }
        sillage {
          id
          value
          trait
          myVote
        }
        complexity {
          id
          value
          trait
          myVote
        }
        balance {
          id
          value
          trait
          myVote
        }
        allure {
          id
          value
          trait
          myVote
        }
      }

      accords(input: $accordsInput) {
        edges {
          node {
            id
            accordId
            name
            color
            votes
            myVote
          }
        }
      }

      notes {
        fragranceId
        top(input: $notesInput) {
          edges {
            node {
              id
              noteId
              name
              icon
              votes
              layer
              myVote
            }
          }
        }
        middle(input: $notesInput) {
          edges {
            node {
              id
              noteId
              name
              icon
              votes
              layer
              myVote
            }
          }
        }
        base(input: $notesInput) {
          edges {
            node {
              id
              noteId
              name
              icon
              votes
              layer
              myVote
            }
          }
        }
      }
      reviews(input: $reviewsInput) {
        edges {
          node {
            id
            author
            rating
            review
            votes
            myVote
            dCreated
            dModified
            dDeleted
          }
        }
      }
    }
  }
`)

export type FlattenedFragranceQuery = FlattenType<NonNullable<FragranceQuery['fragrance']>>
export type FragranceSummary = Pick<FlattenedFragranceQuery, 'id' | 'brand' | 'name' | 'rating' | 'reviewsCount' | 'votes' | 'traits'>

const useFragrance = (fragranceId: number) => {
  const { data, loading, error, refetch } = useQuery(FRAGRANCE_QUERY, { variables: { fragranceId } })

  const refresh = useCallback(() => {
    void refetch()
  }, [refetch])

  const summary = useMemo<FragranceSummary | undefined>(() =>
    (data?.fragrance == null)
      ? undefined
      : {
          id: data.fragrance.id,
          brand: data.fragrance.brand,
          name: data.fragrance.name,
          rating: data.fragrance.rating,
          reviewsCount: data.fragrance.reviewsCount,
          votes: data.fragrance.votes,
          traits: data.fragrance.traits
        }
  , [data?.fragrance])

  const images = useMemo<FlattenedFragranceQuery['images']>(() =>
    flattenConnection(data?.fragrance?.images),
  [data?.fragrance?.images])

  const accords = useMemo<FlattenedFragranceQuery['accords']>(() =>
    flattenConnection(data?.fragrance?.accords),
  [data?.fragrance?.accords])

  const notes = useMemo<FlattenedFragranceQuery['notes']>(() => ({
    fragranceId: data?.fragrance?.notes.fragranceId ?? INVALID_ID,
    top: flattenConnection(data?.fragrance?.notes.top),
    middle: flattenConnection(data?.fragrance?.notes.middle),
    base: flattenConnection(data?.fragrance?.notes.base)
  }),
  [data?.fragrance?.notes])

  const reviews = useMemo<FlattenedFragranceQuery['reviews']>(() =>
    flattenConnection(data?.fragrance?.reviews),
  [data?.fragrance?.reviews])

  return {
    summary,
    images,
    accords,
    notes,
    reviews,
    loading,
    error,

    refresh
  }
}

export default useFragrance
