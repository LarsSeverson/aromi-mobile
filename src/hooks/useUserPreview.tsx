import { gql } from '@apollo/client/core'
import { useQuery } from '@apollo/client'
import { FragranceImage } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { User } from '@/aromi-backend/src/graphql/types/userTypes'

const USER_PREVIEW_QUERY = gql`
  query UserPreview(
    $id: Int!, 
    $collectionsLimit: Int = 6, 
    $collectionsOffset: Int = 0,
    $fragrancesLimit: Int = 4,
    $fragrancesOffset: Int = 0,
    $fragranceImagesLimit: Int = 1,
    $fragranceImagesOffset: Int = 0
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
    }
  }
`

export interface UserPreviewVars {
  id?: number
  collectionsLimit?: number
  collectionsOffset?: number
  fragrancesLimit?: number
  fragrancesOffset?: number
  fragranceImagesLimit?: number
  fragranceImagesOffset?: number
}

export interface FragrancePreview {
  id: number
  images: FragranceImage[]
}

export type FragrancePreviewCollectionUser = Pick<User, 'username'>

export interface FragrancePreviewCollection {
  id: number
  name: string
  fragrances: FragrancePreview[]
  user: FragrancePreviewCollectionUser
}

export type UserPreview = Pick<User, 'id' | 'username' | 'followers' | 'following'> & {
  collections: FragrancePreviewCollection[]
}

export interface UserPreviewData {
  user: UserPreview
}

const useUserPreview = (variables: UserPreviewVars) => {
  const { data, loading, error } = useQuery<UserPreviewData, UserPreviewVars>(USER_PREVIEW_QUERY, { variables })

  return {
    user: data?.user || null,
    loading,
    error
  }
}

export default useUserPreview
