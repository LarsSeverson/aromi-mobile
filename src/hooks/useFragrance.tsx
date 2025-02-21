import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { DocumentNode, gql, useQuery } from '@apollo/client'
import { useCallback, useRef } from 'react'
import useVoteOnFragrance from './useVoteOnFragrance'

const DEFAULT_IMAGES_LIMIT = 5
const DEFAULT_ACCORDS_LIMIT = 8
const DEFAULT_NOTES_LIMIT = 8
const DEFAULT_REVIEWS_LIMIT = 8
const DEFAULT_OFFSET = 0
const DEFAULT_FILL = false

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
    $accordsFill: Boolean,
    $reviewsLimit: Int,
    $reviewsOffset: Int) {
    fragrance(id: $id) {
      id
      brand
      name
      rating
      reviewsCount

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

      reviews(limit: $reviewsLimit, offset: $reviewsOffset) {
        id
        rating
        review
        votes
        dCreated
        dModified
        dDeleted
        user {
          id
          username
        }
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
  reviewsLimit?: number | undefined
  reviewsOffset?: number | undefined

  notesFill?: boolean | undefined
  accordsFill?: boolean | undefined
}

export interface FragranceData {
  fragrance: Fragrance
}

export interface UseFragranceParams {
  query?: DocumentNode | undefined
  variables: FragranceVars
}

const useFragrance = (params: UseFragranceParams) => {
  const { query = FRAGRANCE_QUERY, variables } = params
  const localVariables = useRef<FragranceVars>({
    id: variables.id,
    imagesLimit: variables.imagesLimit ?? DEFAULT_IMAGES_LIMIT,
    notesLimit: variables.notesLimit ?? DEFAULT_NOTES_LIMIT,
    accordsLimit: variables.accordsLimit ?? DEFAULT_ACCORDS_LIMIT,
    reviewsLimit: variables.reviewsLimit ?? DEFAULT_REVIEWS_LIMIT,
    imagesOffset: variables.imagesOffset ?? DEFAULT_OFFSET,
    notesOffset: variables.notesOffset ?? DEFAULT_OFFSET,
    accordsOffset: variables.accordsOffset ?? DEFAULT_OFFSET,
    reviewsOffset: variables.reviewsOffset ?? DEFAULT_OFFSET,
    notesFill: variables.notesFill ?? DEFAULT_FILL,
    accordsFill: variables.accordsFill ?? DEFAULT_FILL
  })

  const {
    data,
    loading: fragranceLoading,
    error: fragranceError,
    refetch
  } = useQuery<FragranceData, FragranceVars>(query, { variables: localVariables.current })

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
