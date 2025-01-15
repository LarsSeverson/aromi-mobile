import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useAppTheme } from '@/src/constants/Themes'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FragranceNote, NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import PreviewNotesList from '@/src/components/fragrance/PreviewNotesList'
import { selectedNotesState } from '@/src/components/fragrance/utils/SelectedNotes'
import ButtonText from '@/src/components/utils/ButtonText'
import { Colors } from '@/src/constants/Colors'

const EditNotesPage = () => {
  const fragranceId = Number(useLocalSearchParams().fragranceId)
  const theme = useAppTheme()
  const router = useRouter()
  const [topLoaded, setTopLoaded] = useState(false)
  const [midLoaded, setMidLoaded] = useState(false)
  const [basLoaded, setBasLoaded] = useState(false)
  const [selectedNotesCount, setSelectedNotesCount] = useState(0)
  const selectedNotes = useRef(new Map<number, FragranceNote>())

  const noteSelected = useCallback((id: number, note: FragranceNote) => {
    selectedNotes.current.has(id)
      ? selectedNotes.current.delete(id)
      : selectedNotes.current.set(id, note)

    setSelectedNotesCount(selectedNotes.current.size)
  }, [])

  const onSeeAll = useCallback((layer: NoteLayer) => {
    router.push({ pathname: '/(core)/home/fragrance/edit/notes-layer', params: { fragranceId, layer } })
  }, [fragranceId, router])

  const onSubmit = useCallback(() => {
    selectedNotesState.value = Array.from(selectedNotes.current.values())
  }, [])

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ opacity: topLoaded && midLoaded && basLoaded ? 1 : 0 }}>
        <PreviewNotesList
          fragranceId={fragranceId}
          layer={NoteLayer.TOP}
          onLoad={() => setTopLoaded(true)}
          onNoteSelected={noteSelected}
          onSeeAll={onSeeAll}
        />
        <PreviewNotesList
          fragranceId={fragranceId}
          layer={NoteLayer.MIDDLE}
          onLoad={() => setMidLoaded(true)}
          onNoteSelected={noteSelected}
          onSeeAll={onSeeAll}
        />
        <PreviewNotesList
          fragranceId={fragranceId}
          layer={NoteLayer.BASE}
          onLoad={() => setBasLoaded(true)}
          onNoteSelected={noteSelected}
          onSeeAll={onSeeAll}
        />
      </ScrollView>

      <SafeAreaView>
        {selectedNotesCount > 0 && (
          <View style={[styles.submitWrapper, { backgroundColor: theme.colors.background }]}>
            <ButtonText text={`Submit (${selectedNotesCount})`} color={Colors.button} textColor={Colors.white} style={styles.submit} onPress={onSubmit} />
          </View>
        )}
      </SafeAreaView>
    </View>
  )
}

export default EditNotesPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  submitWrapper: {
    width: '100%',
    padding: 10
  },
  submit: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 48
  }
})
