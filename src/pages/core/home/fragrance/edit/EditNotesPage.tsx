import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import NotesList from '@/src/components/home/fragrance/NotesList'

const EditNotesPage = () => {
  const router = useRouter()

  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const [topLoaded, setTopLoaded] = useState(false)
  const [midLoaded, setMidLoaded] = useState(false)
  const [basLoaded, setBasLoaded] = useState(false)

  const onSeeAll = useCallback((layer: NoteLayerType) => {
    router.push({ pathname: '/(core)/home/fragrance/edit/notes-layer', params: { fragranceId, layer } })
  }, [fragranceId, router])

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ opacity: topLoaded && midLoaded && basLoaded ? 1 : 0 }}>
        <NotesList
          fragranceId={fragranceId}
          layer={NoteLayerType.TOP}
          onLoad={() => setTopLoaded(true)}
          onSeeAll={() => onSeeAll(NoteLayerType.TOP)}
          onItemSelected={() => onSeeAll(NoteLayerType.TOP)}
        />
        <NotesList
          fragranceId={fragranceId}
          layer={NoteLayerType.MIDDLE}
          onLoad={() => setMidLoaded(true)}
          onSeeAll={() => onSeeAll(NoteLayerType.MIDDLE)}
          onItemSelected={() => onSeeAll(NoteLayerType.MIDDLE)}
        />
        <NotesList
          fragranceId={fragranceId}
          layer={NoteLayerType.BASE}
          onLoad={() => setBasLoaded(true)}
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
    flex: 1
  }
})
