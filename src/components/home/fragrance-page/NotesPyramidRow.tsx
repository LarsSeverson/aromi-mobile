import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { FragranceNote, NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import NotesTrack from './NotesTrack'
import { Text } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'
import { PressableRenderItemProps } from '../../PressableList'

export interface NotesPyramidRowProps {
  notes: FragranceNote[]
  layer: NoteLayerType
}

const NotesPyramidRow = (props: NotesPyramidRowProps) => {
  const theme = useAppTheme()
  const { notes, layer } = props

  const onRenderRowNote = useCallback(({ item: note }: PressableRenderItemProps<FragranceNote>) => {
    if (!note) return null

    return (
      <View style={styles.noteWrapper}>
        <View style={[styles.notePreviewWrapper, { backgroundColor: theme.colors.surfaceDisabled }]} />
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={styles.textWrapper}
        >
          {note.name}
        </Text>
      </View>
    )
  }, [theme])

  if (!notes.length) {
    return null
  }

  return (
    <View style={styles.wrapper}>
      <Text style={{ opacity: 0.8 }}>{layer}</Text>
      <NotesTrack
        notes={notes}
        onRenderNote={onRenderRowNote}
        wrapperStyle={{ alignItems: 'center' }}
        style={styles.trackWrapper}
      />
    </View>
  )
}

export default NotesPyramidRow

const styles = StyleSheet.create({
  wrapper: {
    gap: 5,
    justifyContent: 'center'
  },
  trackWrapper: {
    gap: 10
  },
  noteWrapper: {
    width: 100
  },
  notePreviewWrapper: {
    aspectRatio: 1,
    borderRadius: 15
  },
  textWrapper: {
    marginHorizontal: 5,
    width: '100%'
  }
})
