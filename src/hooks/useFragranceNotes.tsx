import useQuery from './useQuery'
import { FragranceNotes, NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useCallback, useEffect, useRef, useState } from 'react'
import fragranceNotes from '../graphql/queries/fragranceNotes'

export interface FragranceNotesResult {
  fragranceNotes: FragranceNotes
}

export interface FragranceNotesParams {
  id: number
  layer: NoteLayer
  name?: string
  limit?: number
  offset?: number
  fill?: boolean
}

const useFragranceNotes = (params: FragranceNotesParams) => {
  const { id, layer, name, limit = 16, offset = 0, fill = false } = params
  const localVariables = useRef({ id, layer, name, limit, offset, fill })
  const [notes, setNotes] = useState<FragranceNotes | null>([])
  const [noResults, setNoResults] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { data, loading, error, refresh, getData } = useQuery<FragranceNotesResult>({
    query: fragranceNotes,
    variables: localVariables.current,
    authMode: 'iam'
  })

  const search = useCallback((name: string) => {
    localVariables.current.offset = 0
    localVariables.current.name = name

    setNotes([])
    refresh(localVariables.current)
  }, [refresh])

  const getMore = useCallback(() => {
    const offset = localVariables.current.offset
    const limit = localVariables.current.limit

    localVariables.current.offset = offset + limit

    getData(localVariables.current)
  }, [getData])

  useEffect(() => {
    const notesData = data?.fragranceNotes
    if (!notesData) {
      return
    }

    const replace = localVariables.current.offset === 0

    if (replace) {
      setNotes(notesData)
      setNoResults(notesData.length === 0)
    } else {
      setNotes((prev) => [...(prev || []), ...notesData])
    }

    setHasMore(notesData.length >= localVariables.current.limit)
  }, [data])

  return { notes, loading, error, noResults, hasMore, refresh, search, getMore }
}

export default useFragranceNotes
