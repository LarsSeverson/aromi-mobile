import { ListRenderItem, ScrollView, StyleSheet, View, ViewProps, ViewStyle } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FragranceNote, FragranceNotes, NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import BouncyButton from '../utils/BouncyButton'
import { useAppTheme } from '@/src/constants/Themes'
import { ActivityIndicator, Text } from 'react-native-paper'
import { Colors } from '@/src/constants/Colors'
import Skeleton from 'react-native-reanimated-skeleton'

export interface NoteListItemProps extends ViewProps {
  note: FragranceNote
  selected?: boolean
  onSelected?: (id: number, note: FragranceNote) => void
}

const NoteListItem: React.FC<NoteListItemProps> = (props: NoteListItemProps) => {
  const theme = useAppTheme()
  const { note, selected, onSelected } = props
  const [noteSelected, setNoteSelected] = useState(selected)
  const backgroundColor = note.fragranceId === -1 ? 'transparent' : theme.colors.surfaceDisabled

  const toggleSelected = () => {
    if (note.fragranceId === -1) {
      return
    }

    const newSelected = !noteSelected

    setNoteSelected(newSelected)
    onSelected?.(note.noteId, note)
  }

  return (
    <View>
      <BouncyButton onPress={toggleSelected} style={[styles.selectedNote, { borderWidth: noteSelected ? 3 : 0 }]}>
        {!noteSelected && <View style={[styles.noteContentWrapper, { backgroundColor }]} />}
        {noteSelected && <View style={[styles.noteContentWrapper, { backgroundColor, transform: [{ scale: 0.96 }] }]} />}
      </BouncyButton>
      <View style={styles.noteTextWrapper}>
        <Text numberOfLines={1} ellipsizeMode='tail'>{note.name.toLowerCase()}</Text>
        {note.votes > 0 && (
          <Text>{note.votes}</Text>
        )}
      </View>
    </View>
  )
}

// const NotesListLoading = () => {
//   const theme = useAppTheme()

//   return (
//     <Skeleton isLoading containerStyle={{ flex: 1, borderWidth: 1 }}>
//       <View style={{ flexDirection: 'row' }}>
//         <View style={[{ backgroundColor: theme.colors.surfaceDisabled }, styles.noteContentWrapper]} />
//         <View style={[{ backgroundColor: theme.colors.surfaceDisabled }, styles.noteContentWrapper]} />
//       </View>
//     </Skeleton>
//   )
// }

export interface NotesListProps {
  fragranceId: number
  gap?: number | undefined

  layer: NoteLayer
  style?: ViewStyle

  onNoteSelected?: (id: number, note: FragranceNote) => void
  onLoad?: () => void
}

const NotesList: React.FC<NotesListProps> = (props: NotesListProps) => {
  const theme = useAppTheme()
  const { fragranceId, gap = 10, layer, style, onNoteSelected, onLoad } = props
  const { notes, loading, error, noResults, hasMore, refresh, search, getMore } = useFragranceNotes({ id: fragranceId, layer })
  const numColumns = 8

  const renderNote: ListRenderItem<FragranceNote | null> = useCallback(({ item: note }) => {
    return (
      <NoteListItem note={note || { fragranceId: -1, noteId: -1, layer: NoteLayer.FILL, name: '', votes: 0 }} />
    )
  }, [])

  useEffect(() => {
    if (!loading) onLoad?.()
  }, [loading, onLoad])

  // TODO: Skeleton
  if (!notes || loading) {
    return null
  }

  return (
    <View style={{ flex: 1, gap }}>
      <Text variant='titleSmall'>{layer}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item, index) => item?.noteId.toString() || index.toString()}
          contentContainerStyle={StyleSheet.compose({ gap }, style)}
          numColumns={numColumns}
          columnWrapperStyle={{ gap }}
          alwaysBounceVertical={false}
        />
      </ScrollView>

      {notes.length === 0 && (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <Text variant='titleSmall'>No {layer} notes yet</Text>
          <Text variant='labelMedium' style={{ textAlign: 'center', opacity: 0.8 }}>
            Tried this fragrance? Help out the community by sharing your experience
          </Text>
        </View>
      )}

      <BouncyButton style={[styles.addNotesButton, { borderColor: theme.colors.surfaceDisabled }]}>
        <Text style={{ opacity: 0.8 }}>Add {layer} notes</Text>
      </BouncyButton>
    </View>
  )
}

export default NotesList

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  noteContentWrapper: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 20,
    position: 'relative',
    padding: 10
  },
  noteTextWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  selectedNote: {
    borderRadius: 20,
    borderColor: Colors.button
  },
  addNotesButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    marginVertical: 10
  }
})
