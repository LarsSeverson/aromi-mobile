import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import NotesList from '@/src/components/home/fragrance/NotesList'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'

const EditNotesPage = () => {
  const router = useRouter()

  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const {
    notes,
    loading,
    errors
  } = useFragranceNotes({ id: fragranceId, layers: [NoteLayerType.TOP, NoteLayerType.MIDDLE, NoteLayerType.BASE] })

  const onSeeAll = useCallback((layer: NoteLayerType) => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/notes-layer',
      params: {
        fragranceId,
        layer
      }
    })
  }, [fragranceId, router])

  // TODO
  if (loading.notesLoading || !notes) {
    return null
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NotesList
          notes={notes.top}
          layer={NoteLayerType.TOP}
          onSeeAll={() => onSeeAll(NoteLayerType.TOP)}
          onItemSelected={() => onSeeAll(NoteLayerType.TOP)}
        />
        <NotesList
          notes={notes.middle}
          layer={NoteLayerType.MIDDLE}
          onSeeAll={() => onSeeAll(NoteLayerType.MIDDLE)}
          onItemSelected={() => onSeeAll(NoteLayerType.MIDDLE)}
        />
        <NotesList
          notes={notes.base}
          layer={NoteLayerType.BASE}
          onSeeAll={() => onSeeAll(NoteLayerType.BASE)}
          onItemSelected={() => onSeeAll(NoteLayerType.BASE)}
        />
      </ScrollView>
    </View>
  )
}

export default EditNotesPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10
  }
})
