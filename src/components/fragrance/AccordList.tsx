import { StyleSheet, View, ListRenderItem, ViewProps, ViewStyle } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { FragranceAccord, FragranceAccords } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { FlatList } from 'react-native-gesture-handler'
import { useAppTheme } from '@/src/constants/Themes'
import { Text } from 'react-native-paper'
import BouncyButton from '../utils/BouncyButton'
import { Colors } from '@/src/constants/Colors'
import ButtonText from '../utils/ButtonText'

export interface AccordListItemProps {
  accord: FragranceAccord
  onSelect: (selected: boolean) => void
}

const AccordListItem: React.FC<AccordListItemProps> = (props: AccordListItemProps) => {
  const { accord, onSelect } = props
  const [selected, setSelected] = useState(false)

  const toggleSelected = () => {
    const newSelected = !selected
    setSelected(newSelected)
    onSelect(newSelected)
  }

  return (
    <View style={{ flex: 1 }}>
      <BouncyButton onPress={toggleSelected} style={[styles.selectedAccord, { borderWidth: selected ? 3 : 0 }]}>
        {!selected && <View style={[styles.item, { backgroundColor: accord.color }]} />}
        {selected && <View style={[styles.item, { backgroundColor: accord.color, transform: [{ scale: 0.96 }] }]} />}
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
  style?: ViewStyle
}

const AccordList: React.FC<AccordListProps> = (props: AccordListProps) => {
  const theme = useAppTheme()
  const { accords, gap, style } = props
  const paddedAccords = padData(accords)
  const selectedAccords = useRef(new Set())
  const [selectedCount, setSelectedCount] = useState(0)

  const processSelect = useCallback((id: number) => {
    if (selectedAccords.current.has(id)) {
      selectedAccords.current.delete(id)
      setSelectedCount(prev => prev - 1)
    } else {
      selectedAccords.current.add(id)
      setSelectedCount(prev => prev + 1)
    }
  }, [])

  const renderAccord: ListRenderItem<FragranceAccord | null> = useCallback(({ item: accord }) => {
    if (accord === null) {
      return <View style={[styles.item, { backgroundColor: 'transparent' }]} />
    }

    return <AccordListItem accord={accord} onSelect={() => processSelect(accord.accordId)} />
  }, [processSelect])

  return (
    <View style={{ position: 'relative' }}>
      <FlatList
        data={paddedAccords}
        renderItem={renderAccord}
        numColumns={NUM_COLUMNS}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={StyleSheet.compose({ gap, paddingBottom: 150 }, style)}
        columnWrapperStyle={{ gap }}
        ListFooterComponent={() => (
          <BouncyButton style={[styles.questionButton, { borderColor: theme.colors.surfaceDisabled }]}>
            <Text>are we missing something?</Text>
          </BouncyButton>
        )}
      />
      {selectedCount > 0 && (
        <View style={[styles.submitWrapper, { backgroundColor: theme.colors.background }]}>
          <ButtonText text={`Submit (${selectedCount})`} color={Colors.button} textColor={Colors.white} style={styles.submit} />
        </View>
      )}
    </View>
  )
}

export default AccordList

const styles = StyleSheet.create({
  submitWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10
  },
  submit: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
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
  questionButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48
  }
})
