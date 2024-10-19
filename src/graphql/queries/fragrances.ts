import { Fragrances } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import gql from 'graphql-tag'

export interface FragrancesQueryResult {
    fragrances: Fragrances
}

export const fragrances = gql`
    query fragrances($limit: Int, $offset: Int) {
        fragrances(limit: $limit, offset: $offset) {
            id
            brand
            name
            likes
            dislikes
            images {
                s3Key
            }
        }
    }
`
