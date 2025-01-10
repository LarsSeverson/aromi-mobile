import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import { useAppTheme } from '@/src/constants/Themes'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import NotesList from '@/src/components/fragrance/NotesList'

const EditNotesPage = () => {
  const theme = useAppTheme()
  const router = useRouter()
  const fragranceId = Number(useLocalSearchParams().fragranceId)
  const [topLoaded, setTopLoaded] = useState(false)
  const [midLoaded, setMidLoaded] = useState(false)
  const [basLoaded, setBasLoaded] = useState(false)

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView style={{ opacity: topLoaded && midLoaded && basLoaded ? 1 : 0 }}>
        <NotesList fragranceId={fragranceId} layer={NoteLayer.TOP} onLoad={() => setTopLoaded(true)} />
        <NotesList fragranceId={fragranceId} layer={NoteLayer.MIDDLE} onLoad={() => setMidLoaded(true)} />
        <NotesList fragranceId={fragranceId} layer={NoteLayer.BASE} onLoad={() => setBasLoaded(true)} />
      </ScrollView>
    </View>
  )
}

export default EditNotesPage

const styles = StyleSheet.create({})
