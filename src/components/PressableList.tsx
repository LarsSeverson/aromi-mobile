import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import BouncyButton, { BouncyButtonProps } from './BouncyButton'
import RowList, { RowListProps } from './RowList'

export interface PressableRenderItemProps<T> {
  item: T | null
  index: number
}

export interface PressableListItemProps<T> extends PressableRenderItemProps<T>, BouncyButtonProps {
  onRenderItem: (info: PressableRenderItemProps<T>) => React.ReactElement | null
  onItemPressed?: (item: T) => void
}

const PressableListItem = <T, >(props: PressableListItemProps<T>) => {
  const { item, index, onRenderItem, onItemPressed, ...rest } = props

  const handleOnItemPressed = useCallback(() => {
    item && onItemPressed?.(item)
  }, [item, onItemPressed])

  return (
    <BouncyButton {...rest} onPress={handleOnItemPressed}>
      {onRenderItem({ item, index })}
    </BouncyButton>
  )
}

export interface PressableListProps<T> extends Omit<RowListProps<T | null>, 'renderItem' | 'data'> {
  data: Array<T | null>
  numRows?: number | undefined
  numColumns?: number | undefined
  pressableItemProps?: BouncyButtonProps
  onRenderItem: (info: PressableRenderItemProps<T>) => React.ReactElement | null
  onItemPressed?: (item: T) => void
  keyExtractor?: (item: T | null, index: number) => string
}

const PressableList = <T, >(props: PressableListProps<T>) => {
  const {
    data,
    numRows,
    numColumns = 1,
    pressableItemProps,
    onRenderItem,
    onItemPressed,
    keyExtractor,
    ...restProps
  } = props

  const ListComponent = useMemo(() => numRows ? RowList : FlatList, [numRows])

  const renderPressableItem: ListRenderItem<T | null> = useCallback(({ item, index }) => {
    if (!item) return null

    return (
      <PressableListItem
        item={item}
        index={index}
        onRenderItem={onRenderItem}
        onItemPressed={onItemPressed}
        {...pressableItemProps}
      />
    )
  }, [pressableItemProps, onRenderItem, onItemPressed])

  const extractKey = useCallback((item: T | null, index: number) => {
    return keyExtractor ? keyExtractor(item, index) : String(index)
  }, [keyExtractor])

  return (
    <ListComponent
      {...restProps}
      data={data}
      numColumns={numColumns}
      renderItem={renderPressableItem}
      keyExtractor={extractKey}
    />
  )
}

export default PressableList
