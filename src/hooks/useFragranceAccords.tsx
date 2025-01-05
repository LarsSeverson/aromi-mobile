import useQuery from './useQuery'
import fragranceAccordsListQuery from '../graphql/queries/fragranceAccords'
import { FragranceAccords } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export interface FragranceAccordsResult {
  fragranceAccords: FragranceAccords
}

const useFragranceAccords = (id: number, limit: number, offset: number) => {
  const variables = { id, limit, offset }

  const { data, loading, error, refresh } = useQuery<FragranceAccordsResult>({
    query: fragranceAccordsListQuery,
    variables,
    authMode: 'iam'
  })

  const accords = data?.fragranceAccords || null

  return { data: accords, loading, error, refresh }
}

export default useFragranceAccords
