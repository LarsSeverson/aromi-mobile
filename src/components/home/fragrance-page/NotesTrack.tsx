import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { FragranceNote } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import SelectableList, { SelectableListProps, SelectableRenderItemProps } from '../../SelectableList'

export interface NotesTrackProps extends Omit<SelectableListProps<FragranceNote>, 'data' | 'renderItem' | 'style'> {
  notes: FragranceNote[]
  wrapperStyle?: ViewStyle | undefined
  style?: ViewStyle | undefined
  onRenderNote: ({ item, index, selected }: SelectableRenderItemProps<FragranceNote>) => React.JSX.Element | null
}

const NotesTrack = (props: NotesTrackProps) => {
  const {
    notes,
    wrapperStyle,
    style,
    onRenderNote,

    ...rest
  } = props

  if (!notes.length) return null

  return (
    <View style={StyleSheet.compose(styles.wrapper, wrapperStyle)}>
      <SelectableList
        {...rest}
        data={notes}
        numRows={1}
        numColumns={notes.length}
        renderItem={onRenderNote}
        columnWrapperStyle={style}
      />
    </View>
  )
}

export default NotesTrack

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 10
  }
})
