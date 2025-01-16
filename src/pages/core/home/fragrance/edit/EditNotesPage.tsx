import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import PreviewNotesList from '@/src/components/fragrance/PreviewNotesList'

const EditNotesPage = () => {
  const router = useRouter()

  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const [topLoaded, setTopLoaded] = useState(false)
  const [midLoaded, setMidLoaded] = useState(false)
  const [basLoaded, setBasLoaded] = useState(false)

  const onSeeAll = useCallback((layer: NoteLayer) => {
    router.push({ pathname: '/(core)/home/fragrance/edit/notes-layer', params: { fragranceId, layer } })
  }, [fragranceId, router])

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ opacity: topLoaded && midLoaded && basLoaded ? 1 : 0 }}>
        <PreviewNotesList
          fragranceId={fragranceId}
          layer={NoteLayer.TOP}
          onLoad={() => setTopLoaded(true)}
          onSeeAll={() => onSeeAll(NoteLayer.TOP)}
          onItemSelected={() => onSeeAll(NoteLayer.TOP)}
        />
        <PreviewNotesList
          fragranceId={fragranceId}
          layer={NoteLayer.MIDDLE}
          onLoad={() => setMidLoaded(true)}
          onSeeAll={() => onSeeAll(NoteLayer.MIDDLE)}
          onItemSelected={() => onSeeAll(NoteLayer.MIDDLE)}
        />
        <PreviewNotesList
          fragranceId={fragranceId}
          layer={NoteLayer.BASE}
          onLoad={() => setBasLoaded(true)}
          onSeeAll={() => onSeeAll(NoteLayer.BASE)}
          onItemSelected={() => onSeeAll(NoteLayer.BASE)}
        />
      </ScrollView>
    </View>
  )
}

export default EditNotesPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
})
