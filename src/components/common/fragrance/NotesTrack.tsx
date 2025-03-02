import { StyleSheet, View, type ViewStyle } from 'react-native'
import React from 'react'
import PressableList, { type PressableListProps, type PressableRenderItemProps } from '../../common/PressableList'
import { type CardFragranceNote } from './FragranceNoteCard'

type PressableProps = Omit<PressableListProps<CardFragranceNote>, 'style' | 'data' | 'onRenderItem'>

export interface NotesTrackProps extends PressableProps {
  notes: CardFragranceNote[]
  wrapperStyle?: ViewStyle | undefined
  style?: ViewStyle | undefined
  onRenderNote: (info: PressableRenderItemProps<CardFragranceNote>) => React.JSX.Element | null
}

const NotesTrack = (props: NotesTrackProps) => {
  const {
    notes,
    wrapperStyle,
    style,

    onRenderNote,
    ...rest
  } = props

  const columnProps = notes.length > 1 ? { columnWrapperStyle: style } : {}

  return (
    <View style={StyleSheet.compose(styles.wrapper, wrapperStyle)}>
      <PressableList
        {...rest}
        data={notes}
        numRows={1}
        numColumns={notes.length}
        {...columnProps}
        onRenderItem={onRenderNote}
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
