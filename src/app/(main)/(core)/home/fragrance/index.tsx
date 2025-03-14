import React from 'react'
import FragrancePage from '@/src/pages/common/FragrancePage'
import { useLocalSearchParams } from 'expo-router'
import useFragranceInfo from '@/src/hooks/useFragranceInfo'

const Fragrance = () => {
  const { fragranceId } = useLocalSearchParams<{ fragranceId: string }>()
  const parsedFragranceId = Number(fragranceId)

  const { data: fragranceInfo, loading } = useFragranceInfo(parsedFragranceId)

  if (loading) return null // TODO
  if (fragranceInfo == null) return null // TODO

  return (
    <FragrancePage
      fragranceInfo={fragranceInfo}
    />
  )
}

export default Fragrance
