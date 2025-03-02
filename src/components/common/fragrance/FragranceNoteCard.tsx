import { StyleSheet, View, type ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useMemo } from 'react'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import { Image } from 'expo-image'
import { type FragranceNote } from '@/src/generated/graphql'

export type CardFragranceNote = Pick<FragranceNote, 'id' | 'layer' | 'noteId' | 'name' | 'votes' | 'myVote'>

export interface FragranceNoteCardProps {
  note: CardFragranceNote
  selected?: boolean | undefined
  showVotes?: boolean | undefined

  style?: ViewStyle | undefined
  headingStyle?: ViewStyle | undefined
}

const FragranceNoteCard = (props: FragranceNoteCardProps) => {
  const theme = useAppTheme()

  const {
    note,
    selected,
    showVotes,
    style,
    headingStyle
  } = props

  const selectedVotes = useMemo(() => {
    if (note == null) return 0

    const originallySelected = note.myVote === true
    const votes = note.votes

    const addOne = !originallySelected && (selected ?? false)
    const subOne = originallySelected && !(selected ?? false)

    if (addOne) return votes + 1
    if (subOne) return votes - 1

    return votes
  }, [note, selected])

  return (
    <View style={[{ padding: 5 }, style]}>
      <View
        style={[
          styles.noteItemWrapper,
          { borderColor: (selected ?? false) ? Colors.button : theme.colors.surfaceDisabled }
        ]}
      >
        <Image
          style={[
            styles.noteBackground,
            {
              backgroundColor: theme.colors.surfaceDisabled,
              transform: [{ scale: (selected ?? false) ? 0.94 : 1 }]
            }]}
        />
      </View>
      <View style={[styles.noteName, headingStyle]}>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {note?.name.toLowerCase()}
        </Text>
        {(showVotes ?? false) && selectedVotes > 0 && <Text>{selectedVotes}</Text>}
      </View>
    </View>
  )
}

export default FragranceNoteCard

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
