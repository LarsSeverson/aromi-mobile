import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import BouncyButton from './BouncyButton'
import RowList, { RowListProps } from './RowList'

export interface Identifiable { id: number }

export interface SelectableRenderItemProps<T extends Identifiable> {
  item: T | null
  index: number
  selected: boolean
}

export interface SelectableListItemProps<T extends Identifiable> extends SelectableRenderItemProps<T> {
  disabled?: boolean | undefined

  style?: StyleProp<ViewStyle>

  onRenderItem: (info: SelectableRenderItemProps<T>) => React.ReactElement | null

  onItemSelected?: (id: number, item: T, selected: boolean) => void | undefined
}

const SelectableListItem = <T extends Identifiable, >(props: SelectableListItemProps<T>) => {
  const {
    item,
    index,
    selected,
    disabled = false,
    style,

    onRenderItem,
    onItemSelected
  } = props

  const [itemSelected, setItemSelected] = useState(selected)

  const handleItemSelected = useCallback(() => {
    const newSelected = disabled ? false : !itemSelected

    setItemSelected(newSelected)

    item && onItemSelected?.(item.id, item, newSelected)
  }, [disabled, item, itemSelected, onItemSelected])

  return (
    <BouncyButton style={style} onPress={handleItemSelected}>
      {onRenderItem({ item, index, selected: itemSelected })}
    </BouncyButton>
  )
}

export interface SelectableListProps<T extends Identifiable> extends Omit<RowListProps<T | null>, 'renderItem' | 'data'> {
  data: Array<T | null>

  numRows?: number | undefined
  disabled?: boolean | undefined

  renderItemStyle?: StyleProp<ViewStyle>
  selectedItems?: Map<number | string, Identifiable> | undefined

  getKey?: (item: T) => string | undefined
  isSelected?: (item: T) => boolean | undefined

  onRenderItem: (info: SelectableRenderItemProps<T>) => React.ReactElement | null
  onEndReached?: () => void | undefined
  onItemSelected?: (id: number, item: T, selected: boolean) => void | undefined
}

const SelectableList = <T extends Identifiable, >(props: SelectableListProps<T>) => {
  const {
    data,

    numRows,
    numColumns = 1,

    disabled,

    renderItemStyle,

    selectedItems,

    getKey,

    isSelected,

    onRenderItem: renderItem,
    onItemSelected
  } = props

  const List = useMemo(() => numRows ? RowList : FlatList, [numRows])

  const handleItemSelected = useCallback((id: number, item: T, selected: boolean) => {
    onItemSelected?.(id, item, selected)
  }, [onItemSelected])

  const renderSelectableItem: ListRenderItem<T | null> = useCallback(({ item, index }) => {
    if (!item) return null

    const key = getKey?.(item) || item.id
    const selected = ((isSelected?.(item) || selectedItems?.has(key))) || false

    return (
      <SelectableListItem
        item={item}
        index={index}
        selected={selected}
        disabled={disabled}
        style={renderItemStyle}
        onRenderItem={renderItem}
        onItemSelected={handleItemSelected}
      />
    )
  }, [selectedItems, disabled, renderItemStyle, getKey, isSelected, renderItem, handleItemSelected])

  const keyExtractor = useCallback((item: T | null, index: number) => {
    return `${item?.id}-${index}` || `placeholder-${index}`
  }, [])

  return (
    <List
      {...props}
      data={data}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      renderItem={renderSelectableItem}
    />
  )
}

export default SelectableList
