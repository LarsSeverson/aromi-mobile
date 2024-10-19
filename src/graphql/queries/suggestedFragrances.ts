import { Fragrances } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import gql from 'graphql-tag'

export interface SuggestedFragrancesQueryResult {
  fragrances: Fragrances
}

export const fragrances = gql`
  query suggestedFragrances($limit: Int) {
    fragrances(limit: $limit) {
      id,
      brand,
      name,
      likes,
      dislikes,
      images {
        s3Key
      }
    }
  }
`
