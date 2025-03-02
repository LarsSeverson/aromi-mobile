import { useQuery } from '@apollo/client'
import { useCallback } from 'react'
import { graphql } from '../generated'
import { type FragranceQueryVariables } from '../generated/graphql'

const FRAGRANCE_QUERY = graphql(/* GraphQL */ `
  query Fragrance(
    $id: Int!, 
    $imagesLimit: Int = 5, 
    $imagesOffset: Int = 0,
    $notesLimit: Int = 8,
    $notesOffset: Int = 0,
    $notesFill: Boolean = false,
    $accordsLimit: Int = 8,
    $accordsOffset: Int = 0,
    $accordsFill: Boolean = false,
    $reviewsLimit: Int = 10,
    $reviewsOffset: Int = 0) {
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

      notes {
        top(limit: $notesLimit, offset: $notesOffset, fill: $notesFill) {
          id
          noteId
          layer
          name
          votes
          myVote
        }
        middle(limit: $notesLimit, offset: $notesOffset, fill: $notesFill) {
          id
          noteId
          layer
          name
          votes
          myVote
        }
        base(limit: $notesLimit, offset: $notesOffset, fill: $notesFill) {
          id
          noteId
          layer
          name
          votes
          myVote
        }
      }

      accords(limit: $accordsLimit, offset: $accordsOffset, fill: $accordsFill) {
        id
        accordId
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
        author 
        myVote
      }
    }
  }
`)

const useFragrance = (variables: FragranceQueryVariables) => {
  const {
    data,
    loading,
    error,
    refetch
  } = useQuery(FRAGRANCE_QUERY, { variables })

  const refresh = useCallback((variables?: FragranceQueryVariables) => {
    void refetch(variables)
  }, [refetch])

  return {
    fragrance: data?.fragrance,
    loading,
    error,

    refresh
  }
}

export default useFragrance
