import { FlatListProps, FlatList, ScrollView } from 'react-native'
import React from 'react'

export interface RowListProps<T> extends FlatListProps<T> {
  numRows?: number | undefined
}

const RowList = <T, >(props: RowListProps<T>) => {
  const { numRows = 1, ...restProps } = props
  const dataLength = restProps?.data?.length || 0
  const numColumns = Math.ceil(dataLength / numRows)

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        numColumns={numColumns}
        alwaysBounceVertical={false}
        {...restProps}
      />
    </ScrollView>
  )
}

export default RowList
