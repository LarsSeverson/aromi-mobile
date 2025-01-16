import { FlatListProps, FlatList, ScrollView } from 'react-native'
import React from 'react'

export interface RowListProps<T> extends FlatListProps<T> {
  numRows?: number | undefined
}

const RowList = <T, >(props: RowListProps<T>) => {
  const { numRows = 1, numColumns, ...restProps } = props
  const dataLength = restProps?.data?.length || 0

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        numColumns={numColumns || Math.ceil(dataLength / numRows)}
        alwaysBounceVertical={false}
        {...restProps}
      />
    </ScrollView>
  )
}

export default RowList
