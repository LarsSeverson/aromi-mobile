import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import FragranceNotesLayer from '@/src/components/home/fragrance-page/FragranceNotesLayer'

const FragranceNoteLayersPage = () => {
  const router = useRouter()

  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const {
    notes,
    loading,
    errors
  } = useFragranceNotes({ id: fragranceId, layers: [NoteLayerType.TOP, NoteLayerType.MIDDLE, NoteLayerType.BASE] })

  const handleOnExpanded = useCallback((layer: NoteLayerType) => {
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        <FragranceNotesLayer
          notes={notes.top}
          layer={NoteLayerType.TOP}
          onExpanded={handleOnExpanded}
        />
        <FragranceNotesLayer
          notes={notes.middle}
          layer={NoteLayerType.MIDDLE}
          onExpanded={handleOnExpanded}
        />
        <FragranceNotesLayer
          notes={notes.base}
          layer={NoteLayerType.BASE}
          onExpanded={handleOnExpanded}
        />
      </ScrollView>
    </View>
  )
}

export default FragranceNoteLayersPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10
  }
})
