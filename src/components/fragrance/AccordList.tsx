import { StyleSheet, View, ListRenderItem, Dimensions, LayoutChangeEvent, ViewProps, ViewStyle } from 'react-native'
import React, { useCallback, useState } from 'react'
import { FragranceAccord, FragranceAccords } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { FlatList } from 'react-native-gesture-handler'
import { useAppTheme } from '@/src/constants/Themes'
import { Text } from 'react-native-paper'

export interface AccordListProps extends ViewProps {
  accords: FragranceAccords
  gap: number
  style?: ViewStyle
}

const NUM_COLUMNS = 3

const AccordList: React.FC<AccordListProps> = (props: AccordListProps) => {
  const { accords, gap, style } = props

  const padData = useCallback((data: FragranceAccords) => {
    const remainder = data.length % NUM_COLUMNS
    const paddingNeeded = remainder ? NUM_COLUMNS - remainder : 0
    return paddingNeeded > 0 ? [...data, ...Array(paddingNeeded).fill(null)] : data
  }, [])

  const paddedAccords = padData(accords)

  const renderAccord: ListRenderItem<FragranceAccord | null> = useCallback(({ item: accord }) => {
    if (accord === null) {
      return <View style={[styles.item, { backgroundColor: 'transparent' }]} />
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.item,
            { backgroundColor: accord.color }
          ]}
        />
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
          <Text numberOfLines={1} ellipsizeMode='tail'>{accord.name.toLowerCase()}</Text>
          {accord.votes > 0 && (
            <Text>{accord.votes}</Text>
          )}
        </View>
      </View>

    )
  }, [])

  return (
    <FlatList
      data={paddedAccords}
      renderItem={renderAccord}
      numColumns={NUM_COLUMNS}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={StyleSheet.compose({ gap, justifyContent: 'space-evenly' }, style)}
      columnWrapperStyle={{ gap, justifyContent: 'space-evenly' }}
    />
  )
}

export default AccordList

const styles = StyleSheet.create({
  item: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20,
    position: 'relative',
    padding: 10
  }
})
