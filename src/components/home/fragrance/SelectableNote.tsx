import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useMemo } from 'react'
import { Identifiable, SelectableRenderItemProps } from '../../SelectableList'
import { FragranceNote } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

export interface SelectableNoteProps<T extends Identifiable> extends SelectableRenderItemProps<T> {
  originallySelected?: boolean | undefined
}

const SelectableNote: React.FC<SelectableNoteProps<FragranceNote>> = (props: SelectableNoteProps<FragranceNote>) => {
  const theme = useAppTheme()

  const {
    item: note,
    selected,
    originallySelected = false
  } = props

  const selectedVotes = useMemo(() => {
    if (!note) return 0

    const votes = note.votes

    const addOne = !originallySelected && selected
    const subOne = originallySelected && !selected

    if (addOne) return votes + 1
    if (subOne) return votes - 1

    return votes
  }, [note, originallySelected, selected])

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
        {selectedVotes > 0 && <Text>{selectedVotes}</Text>}
      </View>
    </View>
  )
}

export default SelectableNote

const styles = StyleSheet.create({
  noteItemWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 3
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
