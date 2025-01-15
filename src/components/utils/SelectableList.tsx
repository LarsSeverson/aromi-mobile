import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import React, { useCallback, useMemo, useState } from 'react'
import RowList, { RowListProps } from './RowList'
import BouncyButton from './BouncyButton'

export interface SelectableRenderItemProps<T> {
  item: T | null

  index: number

  selected: boolean
}

export interface SelectableListItemProps<T> extends SelectableRenderItemProps<T> {
  disabled?: boolean | undefined

  renderItem: (info: SelectableRenderItemProps<T>) => React.ReactElement

  style?: StyleProp<ViewStyle>

  onItemSelected?: (newSelected: boolean) => void | undefined
}

const SelectableListItem = <T, >(props: SelectableListItemProps<T>) => {
  const {
    item,
    index,
    selected = false,
    disabled = false,
    style,
    renderItem,
    onItemSelected
  } = props
  const [itemSelected, setItemSelected] = useState(selected || false)

  const handleItemSelected = useCallback(() => {
    if (disabled) return

    const newSelected = !itemSelected

    setItemSelected(newSelected)
    onItemSelected?.(newSelected)
  }, [disabled, itemSelected, onItemSelected])

  return (
    <BouncyButton style={style} onPress={handleItemSelected}>
      {renderItem({ item, index, selected: itemSelected })}
    </BouncyButton>
  )
}

export interface Identifiable { id: number }
export interface SelectableListProps<T extends Identifiable> extends Omit<RowListProps<T | null>, 'renderItem'> {
  data: Array<T | null>

  numRows?: number | undefined

  disabled?: boolean | undefined

  renderItem: (info: SelectableRenderItemProps<T>) => React.ReactElement

  renderItemStyle?: StyleProp<ViewStyle>

  selectedItems?: Map<number, T> | undefined

  onEndReached?: () => void | undefined
  onItemSelected?: (id: number, item: T) => void | undefined
}

const SelectableList = <T extends Identifiable, >(props: SelectableListProps<T>) => {
  const {
    data,
    numRows,
    numColumns = 1,
    disabled,
    renderItemStyle,
    selectedItems,
    renderItem
  } = props

  const List = numRows ? RowList : FlatList

  const renderSelectableItem: ListRenderItem<T | null> = useCallback(({ item, index }) => {
    return (
      <SelectableListItem
        selected={(item && selectedItems?.has(item.id)) || false}
        disabled={disabled}
        item={item}
        index={index}
        style={renderItemStyle}
        renderItem={renderItem}
      />
    )
  }, [selectedItems, disabled, renderItemStyle, renderItem])

  const keyExtractor = useCallback((item: T | null, index: number) => {
    return item?.id.toString() || `placeholder-${index}`
  }, [])

  return (
    <List
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      {...props}
      data={data}
      renderItem={renderSelectableItem}
    />
  )
}

export default SelectableList
