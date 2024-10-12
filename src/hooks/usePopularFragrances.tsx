import { fragrances, FragrancesQueryResult } from '../graphql/queries/fragrances'
import useQuery from './useQuery'
import { useMemo } from 'react'

const usePopularFragrances = () => {
  const variables = useMemo(() => ({ limit: 10, offset: 0 }), [])

  const { data, loading, error, refresh } = useQuery<FragrancesQueryResult>(
    {
      query: fragrances,
      variables,
      authMode: 'AWS_IAM'
    }
  )

  const popularFragrances = data?.fragrances

  return { popularFragrances, loading, error, refresh }
}

export default usePopularFragrances
