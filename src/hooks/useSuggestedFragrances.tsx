import { FragrancesArgs } from '@/aromi-backend/src/graphql/types/queryArgs'
import suggestedFragrancesQuery from '../graphql/queries/suggestedFragrances'
import useQuery from './useQuery'
import { useMemo } from 'react'
import { Fragrances } from '@/aromi-backend/src/graphql/types/fragranceTypes'

interface SuggestedFragrancesResult {
  fragrances: Fragrances
}

const useSuggestedFragrances = () => {
  const variables = { limit: 10, offset: 0 }

  const { data, loading, error, refresh } = useQuery<SuggestedFragrancesResult>(
    {
      query: suggestedFragrancesQuery,
      variables,
      authMode: 'iam'
    }
  )

  const suggestedFragrances = data?.fragrances || null

  return { data: suggestedFragrances, loading, error, refresh }
}

export default useSuggestedFragrances
