import { useQuery } from '@apollo/client'
import { graphql } from '../generated'
import { type UserPreviewQueryVariables } from '../generated/graphql'
import { INVALID_ID } from '../common/util-types'

const USER_PREVIEW_QUERY = graphql(/* GraphQL */`
  query UserPreview(
    $id: Int!, 
    $collectionsLimit: Int = 6, 
    $collectionsOffset: Int = 0,
    $fragrancesLimit: Int = 4,
    $fragrancesOffset: Int = 0,
    $fragranceImagesLimit: Int = 1,
    $fragranceImagesOffset: Int = 0,
    $reviewsLimit: Int = 10,
    $reviewsOffset: Int = 0,
    $likesLimit: Int = 10,
    $likesOffset: Int = 0
    ) {
    user(id: $id) {
      id
      username

      followers
      following
      collections(limit: $collectionsLimit, offset: $collectionsOffset) {
        id
        name
        fragrances(limit: $fragrancesLimit, offset: $fragrancesOffset) {
          id
          images(limit: $fragranceImagesLimit, offset: $fragranceImagesOffset) {
            id
            url
          }
        }
        user {
          username
        }
      }
      reviews(limit: $reviewsLimit, offset: $reviewsOffset) {
        id
        rating
        review
        votes
        author
        myVote
        dCreated
        dModified
      }
      likes(limit: $likesLimit, offset: $likesOffset) {
        id
        vote {
          id
          likes
          dislikes
          myVote
        }
      }
    }
  }
`)

const useUserPreview = (variables: UserPreviewQueryVariables) => {
  const { data, loading, error } = useQuery(USER_PREVIEW_QUERY, {
    variables,
    skip: variables.id === INVALID_ID
  })

  return {
    user: data?.user,
    loading,
    error
  }
}

export default useUserPreview
