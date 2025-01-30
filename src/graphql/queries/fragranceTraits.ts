import { FragranceTrait } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export const fragranceTraitsQuery = `#graphql
  query FragranceTraitsQuery ($id: Int!) {
    fragranceTraits (id: $id) {
      id
      fragranceId

      trait

      averageValue
    }
  }
`

export interface FragranceTraitsQueryArgs {
  id: number
}

export interface FragranceTraitsQueryResult {
  fragranceTraits: FragranceTrait[]
}
