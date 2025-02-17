import { StyleSheet, View } from 'react-native'
import { FragranceNote, NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import React, { useCallback } from 'react'
import { Text } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'
import TextButton from '../../TextButton'
import NotesTrack from './NotesTrack'
import FragranceEmpty from './FragranceEmpty'
import FeedbackButton from '../../FeedbackButton'
import { PressableRenderItemProps } from '../../PressableList'

export interface FragranceNotesLayerProps {
  notes: FragranceNote[]
  layer: NoteLayerType
  onExpanded?: (layer: NoteLayerType) => void
}

const FragranceNotesLayer = (props: FragranceNotesLayerProps) => {
  const theme = useAppTheme()
  const { notes, layer, onExpanded } = props

  const handleOnNotePressed = useCallback(() => onExpanded?.(layer), [layer, onExpanded])

  const onRenderNote = useCallback(({ item: note }: PressableRenderItemProps<FragranceNote>) => {
    if (!note) return null

    return (
      <View style={styles.noteWrapper}>
        <View style={[styles.notePreviewWrapper, { backgroundColor: theme.colors.surfaceDisabled }]} />
        <View style={styles.noteTextWrapper}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{ flex: 1 }}
          >
            {note.name}
          </Text>
          <Text>
            {note.votes}
          </Text>
        </View>

      </View>
    )
  }, [theme])

  return (
    <View style={styles.wrapper}>
      <View style={styles.heading}>
        <Text variant='titleSmall'>{layer}</Text>
        {notes.length > 0 && <TextButton text='see all' onPress={handleOnNotePressed} />}
      </View>
      <NotesTrack
        notes={notes}
        style={styles.trackWrapper}
        onRenderNote={onRenderNote}
        onItemPressed={handleOnNotePressed}
      />
      {notes.length === 0 && <FragranceEmpty headline={`There are no ${layer} notes yet`} />}
      <FeedbackButton onPress={handleOnNotePressed} text='how do the notes develop?' />
    </View>
  )
}

export default FragranceNotesLayer

const styles = StyleSheet.create({
  wrapper: {
    gap: 5
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  trackWrapper: {
    gap: 10
  },
  noteWrapper: {
    width: 200
  },
  noteTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  notePreviewWrapper: {
    aspectRatio: 1,
    borderRadius: 15
  }
})
