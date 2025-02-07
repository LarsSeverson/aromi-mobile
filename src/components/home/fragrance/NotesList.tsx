import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { FragranceNote, NoteLayerType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import useFragranceNotes from '@/src/hooks/useFragranceNotes'
import { Text } from 'react-native-paper'
import FragranceEmpty from './FragranceEmpty'
import TextButton from '../../TextButton'
import FeedbackButton from '../../FeedbackButton'
import SelectableList, { Identifiable, SelectableListProps, SelectableRenderItemProps } from '../../SelectableList'
import SelectableNote from './SelectableNote'

export interface NotesListProps<T extends Identifiable> extends Omit<SelectableListProps<T>, 'data' | 'renderItem'> {
  fragranceId: number

  layer: NoteLayerType

  onLoad?: () => void | undefined
  onSeeAll?: () => void | undefined
}

const NotesList = (props: NotesListProps<FragranceNote>) => {
  const {
    fragranceId,

    layer,

    onLoad,
    onSeeAll,

    ...rest
  } = props

  const {
    notes,
    loading,
    error,
    refresh
  } = useFragranceNotes({ fragranceId, layer, withVotes: false })

  const onRenderNote = useCallback(({ item, index, selected }: SelectableRenderItemProps<FragranceNote>) => {
    return (
      <SelectableNote item={item} index={index} selected={selected} />
    )
  }, [])

  useEffect(() => {
    if (!loading.notes && !loading.votes) {
      onLoad?.()
    }
  }, [loading, onLoad])

  // TODO: Skeleton
  if (!notes) {
    return null
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.heading}>
        <Text variant='titleSmall'>{layer}</Text>
        <TextButton text='see all' onPress={onSeeAll} />
      </View>

      <SelectableList
        data={notes.slice(0, 8)}
        disabled
        numRows={1}
        numColumns={8}
        renderItem={onRenderNote}
        renderItemStyle={{ width: 200 }}
        {...rest}
      />

      {notes.length === 0 && <FragranceEmpty headline={`There are no ${layer} notes yet`} />}

      <FeedbackButton onPress={onSeeAll} />
    </View>
  )
}

export default NotesList

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 5,
    gap: 10
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
