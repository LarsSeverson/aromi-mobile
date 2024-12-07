import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import useQuery from './useQuery'
import fragranceQuery from '../graphql/queries/fragrance'

export interface FragranceResult {
  fragrance: Fragrance
}

const useFragrance = (id: number) => {
  const variables = { id }

  const { data, loading, error, refresh } = useQuery<FragranceResult>({
    query: fragranceQuery,
    variables,
    authMode: 'iam'
  })

  const fragrance = data?.fragrance || null

  return { data: fragrance, loading, error, refresh }
}

export default useFragrance
