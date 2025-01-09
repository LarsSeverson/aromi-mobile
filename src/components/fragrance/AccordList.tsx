import { StyleSheet, View, ListRenderItem, ViewProps, ViewStyle } from 'react-native'
import React, { useCallback, useState } from 'react'
import { FragranceAccord, FragranceAccords } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { FlatList } from 'react-native-gesture-handler'
import { useAppTheme } from '@/src/constants/Themes'
import { ActivityIndicator, Text } from 'react-native-paper'
import BouncyButton from '../utils/BouncyButton'
import { Colors } from '@/src/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

export interface AccordListItemProps {
  accord: FragranceAccord
  selected?: boolean
  onSelect?: (id: number) => void
}

const AccordListItem: React.FC<AccordListItemProps> = (props: AccordListItemProps) => {
  const { accord, selected = false, onSelect } = props
  const [accordSelected, setAccordSelected] = useState(selected)

  const toggleSelected = () => {
    if (accord.fragranceId === -1) {
      return
    }

    const newSelected = !accordSelected
    setAccordSelected(newSelected)
    onSelect?.(accord.accordId)
  }

  return (
    <View style={{ flex: 1 }}>
      <BouncyButton onPress={toggleSelected} style={[styles.selectedAccord, { borderWidth: accordSelected ? 3 : 0 }]}>
        {!accordSelected && <View style={[styles.item, { backgroundColor: accord.color }]} />}
        {accordSelected && <View style={[styles.item, { backgroundColor: accord.color, transform: [{ scale: 0.96 }] }]} />}
      </BouncyButton>
      <View style={styles.accordTextWrapper}>
        <Text numberOfLines={1} ellipsizeMode='tail'>{accord.name.toLowerCase()}</Text>
        {accord.votes > 0 && (
          <Text>{accord.votes}</Text>
        )}
      </View>
    </View>
  )
}
const NUM_COLUMNS = 3

const padData = (data: FragranceAccords) => {
  const remainder = data.length % NUM_COLUMNS
  const paddingNeeded = remainder ? NUM_COLUMNS - remainder : 0
  return paddingNeeded > 0 ? [...data, ...Array(paddingNeeded).fill(null)] : data
}

export interface AccordListProps extends ViewProps {
  accords: FragranceAccords
  gap: number
  searchTerm?: string
  loading?: boolean
  hasMore?: boolean
  noResults?: boolean
  selectedAccordIds?: Set<number>
  accordSelected?: (id: number) => void
  getMoreAccords?: () => void
  style?: ViewStyle
}

const AccordList: React.FC<AccordListProps> = (props: AccordListProps) => {
  const theme = useAppTheme()
  const { accords, gap, loading, hasMore, noResults, searchTerm, selectedAccordIds, style, accordSelected, getMoreAccords } = props
  const paddedAccords = padData(accords)

  const renderAccord: ListRenderItem<FragranceAccord | null> = useCallback(({ item: accord }) => {
    return (
      <AccordListItem
        accord={accord || { fragranceId: -1, accordId: 0, name: '', color: 'transparent', votes: 0 }}
        selected={(accord && selectedAccordIds?.has(accord.accordId)) || false}
        onSelect={accordSelected}
      />
    )
  }, [accordSelected, selectedAccordIds])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['left', 'right']}>
      <FlatList
        data={paddedAccords}
        renderItem={renderAccord}
        keyExtractor={(item, index) => item?.accordId.toString() || index.toString()}
        numColumns={NUM_COLUMNS}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={StyleSheet.compose({ gap }, style)}
        columnWrapperStyle={{ gap }}
        onEndReached={getMoreAccords}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => !loading && noResults && <Text style={styles.feedbackText}>No results for "{searchTerm}"</Text>}
        ListFooterComponent={() => loading
          ? <ActivityIndicator />
          : (
            <>
              {!noResults && !hasMore && <Text style={[styles.feedbackText, { opacity: 0.8 }]}>End of accords</Text>}
              <BouncyButton style={[styles.feedbackButton, { borderColor: theme.colors.surfaceDisabled }]}>
                <Text>are we missing something?</Text>
              </BouncyButton>
            </>
            )}
      />
    </SafeAreaView>
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
  },
  accordTextWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  selectedAccord: {
    borderRadius: 20,
    borderColor: Colors.button
  },
  feedbackButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    margin: 10
  },
  feedbackText: {
    padding: 10,
    alignSelf: 'center'
  }
})
