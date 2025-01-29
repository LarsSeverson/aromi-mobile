import useQuery from './useQuery'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useEffect, useMemo, useRef } from 'react'
import fragranceCharacteristicsQuery from '../graphql/queries/fragranceCharacteristics'

const useFragranceCharacteristics = (id: number) => {
  const localVariables = useRef({ id })

  // // const { data, loading, error, refresh, getData } = useQuery<FragranceNotesResult>({
  // //   query: fragranceCharacteristicsQuery,
  // //   variables: localVariables.current,
  // //   authMode: 'iam'
  // // })

  // const fragrance = data?.fragrance

  // return useMemo(() => ({
  //   fragrance,
  //   loading,
  //   error,
  //   refresh
  // }), [fragrance, error, loading, refresh])
}

export default useFragranceCharacteristics
