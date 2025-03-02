import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import FragranceNotesLayer from '@/src/components/common/fragrance/FragranceNotesLayer'
import { NoteLayer } from '@/src/generated/graphql'

const FragranceNoteLayersPage = () => {
  const router = useRouter()

  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const {
    notes,
    loading
  } = useFragranceNotes({ id: fragranceId, includeTop: true, includeMiddle: true, includeBase: true })

  const handleOnExpanded = useCallback((layer: NoteLayer) => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/notes-layer',
      params: {
        fragranceId,
        layer
      }
    })
  }, [fragranceId, router])

  // TODO
  if (loading || notes == null) {
    return null
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        <FragranceNotesLayer
          notes={notes.top ?? []}
          layer={NoteLayer.Top}
          onExpanded={handleOnExpanded}
        />
        <FragranceNotesLayer
          notes={notes.middle ?? []}
          layer={NoteLayer.Middle}
          onExpanded={handleOnExpanded}
        />
        <FragranceNotesLayer
          notes={notes.base ?? []}
          layer={NoteLayer.Base}
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
