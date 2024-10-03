import { fragrances, FragrancesQueryResult } from '../graphql/queries/fragrances'
import { Fragrances } from '@/aromi-backend/src/types/fragrances'
import useQuery from './useQuery'
import { useMemo } from 'react'

const useLikedFragrances = () => {
  const variables = useMemo(() => ({ limit: 10, offset: 0 }), [])

  const { data, loading, error, refresh } = useQuery<FragrancesQueryResult>(
    {
      query: fragrances,
      variables,
      authMode: 'AWS_IAM'
    }
  )

  const likedFragrances = data?.fragrances as Fragrances

  return { likedFragrances, loading, error, refresh }
}

export default useLikedFragrances
