import { StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFragranceAccords from '@/src/hooks/useFragranceAccords'
import AccordList from '@/src/components/fragrance/AccordList'

const EditAccordsPage = () => {
  const router = useRouter()
  const fragranceId = Number(useLocalSearchParams().fragranceId)
  const LIMIT = 21
  const offset = useRef(0)

  const { data: accords, loading, error, refresh } = useFragranceAccords(fragranceId, LIMIT, offset.current)

  if (loading || !accords) {
    return null
  }

  return (
    <AccordList accords={accords} gap={10} style={{ padding: 20 }} />
  )
}

export default EditAccordsPage

const styles = StyleSheet.create({})
