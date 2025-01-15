import { ListRenderItem, ScrollView, StyleSheet, View, ViewProps, ViewStyle } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FragranceNote, NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import { FlatList } from 'react-native-gesture-handler'
import BouncyButton from '../utils/BouncyButton'
import { useAppTheme } from '@/src/constants/Themes'
import { Text } from 'react-native-paper'
import { Colors } from '@/src/constants/Colors'
import EmptyProperty from './EmptyProperty'
import TextButton from '../utils/TextButton'

export interface PreviewNotesListItemProps extends ViewProps {
  note: FragranceNote
  selected?: boolean
  onSelected?: (id: number, note: FragranceNote) => void
}

const PreviewNotesListItem: React.FC<PreviewNotesListItemProps> = (props: PreviewNotesListItemProps) => {
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
      <BouncyButton onPress={toggleSelected} style={[styles.noteWrapper, { borderColor: noteSelected ? Colors.button : backgroundColor }]}>
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

export interface PreviewNotesListProps {
  fragranceId: number
  gap?: number | undefined
  numRows?: number | undefined
  numColumns?: number | undefined

  layer: NoteLayer
  style?: ViewStyle

  onNoteSelected?: (id: number, note: FragranceNote) => void
  onSeeAll?: (layer: NoteLayer) => void
  onLoad?: () => void
}

const PreviewNotesList: React.FC<PreviewNotesListProps> = (props: PreviewNotesListProps) => {
  const theme = useAppTheme()
  const {
    fragranceId,
    gap = 10,
    numRows = 1,
    numColumns = 8,
    layer,
    style,
    onNoteSelected,
    onSeeAll,
    onLoad
  } = props
  const { notes, loading, error, refresh } = useFragranceNotes({ id: fragranceId, layer })

  const renderNote: ListRenderItem<FragranceNote | null> = useCallback(({ item: note }) => {
    if (!note) return null

    return (
      <PreviewNotesListItem note={note} onSelected={onNoteSelected} />
    )
  }, [onNoteSelected])

  useEffect(() => {
    if (!loading) {
      onLoad?.()
    }
  }, [loading, onLoad])

  // TODO: Skeleton
  if (!notes || loading) {
    return null
  }

  return (
    <View style={{ flex: 1, margin: 10, gap }}>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant='titleSmall'>{layer}</Text>
        <TextButton text='see all' onPress={() => onSeeAll?.(layer)} />
      </View>

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
        <EmptyProperty headline={`No ${layer} notes yet`} />
      )}

      <BouncyButton style={[styles.addNotesButton, { borderColor: theme.colors.surfaceDisabled }]} onPress={() => onSeeAll?.(layer)}>
        <Text style={{ opacity: 0.8 }}>Add {layer} notes</Text>
      </BouncyButton>
    </View>
  )
}

export default PreviewNotesList

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  noteContentWrapper: {
    width: 150,
    aspectRatio: 1,
    position: 'relative',
    padding: 10,
    borderRadius: 10
  },
  noteTextWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  noteWrapper: {
    borderRadius: 20,
    borderWidth: 3,
    overflow: 'hidden'
  },
  addNotesButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    marginVertical: 10
  }
})
