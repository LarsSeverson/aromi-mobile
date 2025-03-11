import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import FragranceNotesLayer from '@/src/components/common/fragrance/FragranceNotesLayer'
import { NoteLayer } from '@/src/generated/graphql'

const FragranceNoteLayersPage = () => {
  const router = useRouter()
  const fragranceId = Number(useLocalSearchParams<{ fragranceId: string }>().fragranceId)

  const { data, loading } = useFragranceNotes(fragranceId)

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
  if (loading) {
    return null
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        <FragranceNotesLayer
          notes={data.top}
          layer={NoteLayer.Top}
          onExpanded={handleOnExpanded}
        />
        <FragranceNotesLayer
          notes={data.middle}
          layer={NoteLayer.Middle}
          onExpanded={handleOnExpanded}
        />
        <FragranceNotesLayer
          notes={data.base}
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
