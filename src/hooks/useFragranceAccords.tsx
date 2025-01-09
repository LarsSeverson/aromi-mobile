import useQuery from './useQuery'
import { FragranceAccords } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useCallback, useEffect, useRef, useState } from 'react'
import fragranceAccords from '../graphql/queries/fragranceAccords'

export interface FragranceAccordsResult {
  fragranceAccords: FragranceAccords
}

const useFragranceAccords = (id: number, name: string, limit: number = 30, offset: number = 0) => {
  const localVariables = useRef({ id, name, limit, offset })
  const [accords, setAccords] = useState<FragranceAccords | null>([])
  const [noResults, setNoResults] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { data, loading, error, refresh, getData } = useQuery<FragranceAccordsResult>({
    query: fragranceAccords,
    variables: localVariables.current,
    authMode: 'iam'
  })

  const search = useCallback((name: string) => {
    localVariables.current.offset = 0
    localVariables.current.name = name

    setAccords([])
    refresh(localVariables.current)
  }, [refresh])

  const getMore = useCallback(() => {
    const offset = localVariables.current.offset
    const limit = localVariables.current.limit

    localVariables.current.offset = offset + limit

    getData(localVariables.current)
  }, [getData])

  useEffect(() => {
    const accordsData = data?.fragranceAccords
    if (!accordsData) {
      return
    }

    const replace = localVariables.current.offset === 0

    if (replace) {
      setAccords(accordsData)
      setNoResults(accordsData.length === 0)
    } else {
      setAccords((prev) => [...(prev || []), ...accordsData])
    }

    setHasMore(accordsData.length >= localVariables.current.limit)
  }, [data])

  return { accords, loading, error, noResults, hasMore, refresh, search, getMore }
}

export default useFragranceAccords
