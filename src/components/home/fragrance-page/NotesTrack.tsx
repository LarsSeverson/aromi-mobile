import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { FragranceNote } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import PressableList, { PressableListProps, PressableRenderItemProps } from '../../PressableList'

export interface NotesTrackProps extends Omit<PressableListProps<FragranceNote>, 'data' | 'style' | 'onRenderItem'> {
  notes: FragranceNote[]
  wrapperStyle?: ViewStyle | undefined
  style?: ViewStyle | undefined
  onRenderNote: (info: PressableRenderItemProps<FragranceNote>) => React.JSX.Element | null
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
