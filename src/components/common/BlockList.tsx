import { FlatList, type StyleProp, type ViewStyle } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import RowList, { type RowListProps } from './RowList'

interface Identifiable { id: number }

export interface BlockListProps<T extends Identifiable> extends RowListProps<T | null> {
  data: Array<T | null>

  numRows?: number | undefined
  numColumns?: number | undefined

  renderItemStyle?: StyleProp<ViewStyle>
}

const BlockList = <T extends Identifiable, >(props: BlockListProps<T>) => {
  const {
    data,
    numRows,
    numColumns = 1,

    renderItem
  } = props

  const List = useMemo(() => (numRows != null) ? RowList : FlatList, [numRows])

  const keyExtractor = useCallback((item: T | null, index: number) => {
    if (item == null) return `placeholder-${index}`
    return item.id.toString()
  }, [])

  return (
    <List
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      {...props}
      data={data}
      renderItem={renderItem}
    />
  )
}

export default BlockList
