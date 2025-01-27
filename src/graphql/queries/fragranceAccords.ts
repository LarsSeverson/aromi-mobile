import { FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'

const fragranceAccords = `#graphql
  query fragranceAccords($id: Int!, $name: String, $limit: Int, $offset: Int) {
    fragranceAccords(id: $id, name: $name, limit: $limit, offset: $offset) {
      id
      accordId
      name
      color
      votes
    }
  }
`

export interface FragranceAccordsArgs {
  id: number
  limit?: number | undefined
  offset?: number | undefined

  name?: string | undefined
}

export interface FragranceAccordsResult {
  fragranceAccords: FragranceAccord[]
}

export default fragranceAccords
