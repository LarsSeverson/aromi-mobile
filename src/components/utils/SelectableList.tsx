import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import React, { useCallback, useMemo, useState } from 'react'
import RowList, { RowListProps } from './RowList'
import BouncyButton from './BouncyButton'

export interface Identifiable { id: number }

export interface SelectableRenderItemProps<T extends Identifiable> {
  item: T | null

  index: number

  selected: boolean
}

export interface SelectableListItemProps<T extends Identifiable> extends SelectableRenderItemProps<T> {
  disabled?: boolean | undefined

  renderItem: (info: SelectableRenderItemProps<T>) => React.ReactElement

  style?: StyleProp<ViewStyle>

  onItemSelected?: (id: number, item: T, selected: boolean) => void | undefined
}

const SelectableListItem = <T extends Identifiable, >(props: SelectableListItemProps<T>) => {
  const {
    item,
    index,
    selected,
    disabled = false,
    style,
    renderItem,
    onItemSelected
  } = props

  const handleItemSelected = useCallback(() => {
    if (disabled) return

    item && onItemSelected?.(item.id, item, !selected)
  }, [disabled, item, onItemSelected, selected])

  return (
    <BouncyButton style={style} onPress={handleItemSelected}>
      {renderItem({ item, index, selected })}
    </BouncyButton>
  )
}

export interface SelectableListProps<T extends Identifiable> extends Omit<RowListProps<T | null>, 'renderItem'> {
  data: Array<T | null>

  numRows?: number | undefined

  disabled?: boolean | undefined

  renderItem: (info: SelectableRenderItemProps<T>) => React.ReactElement

  renderItemStyle?: StyleProp<ViewStyle>

  selectedItems?: Map<number | string, T> | undefined

  getKey?: (item: T) => string | undefined

  isSelected?: (item: T) => boolean | undefined

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

    renderItem,
    onItemSelected
  } = props

  const List = numRows ? RowList : FlatList

  const renderSelectableItem: ListRenderItem<T | null> = useCallback(({ item, index }) => {
    if (!item) return null

    const key = getKey?.(item) || item.id
    const selected = ((isSelected?.(item) || selectedItems?.has(key))) || false

    return (
      <SelectableListItem
        selected={selected}
        disabled={disabled}
        item={item}
        index={index}
        style={renderItemStyle}
        renderItem={renderItem}
        onItemSelected={onItemSelected}
      />
    )
  }, [selectedItems, disabled, renderItemStyle, getKey, isSelected, renderItem, onItemSelected])

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
