import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import { SelectableRenderItemProps } from '../utils/SelectableList'
import { FragranceNote } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

export interface NotesLayerNoteProps<T> extends SelectableRenderItemProps<T> {}

const NotesLayerNote: React.FC<NotesLayerNoteProps<FragranceNote | null>> = (props: NotesLayerNoteProps<FragranceNote | null>) => {
  const theme = useAppTheme()
  const { item: note, selected } = props

  return (
    <View style={{ padding: 5 }}>
      <View style={[styles.noteItemWrapper, { borderColor: selected ? Colors.button : theme.colors.surfaceDisabled }]}>
        <View style={[
          styles.noteBackground,
          {
            backgroundColor: theme.colors.surfaceDisabled,
            transform: [{ scale: selected ? 0.94 : 1 }]
          }]}
        />
      </View>
      <View style={styles.noteName}>
        <Text numberOfLines={1} ellipsizeMode='tail'>{note?.name.toLowerCase()}</Text>
        {note && note.votes > 0 && <Text>{note?.votes}</Text>}
      </View>
    </View>
  )
}

export default NotesLayerNote

const styles = StyleSheet.create({
  noteItemWrapper: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2
  },
  noteBackground: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10
  },
  noteName: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10
  }
})
