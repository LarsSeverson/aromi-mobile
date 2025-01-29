import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useMemo } from 'react'
import { Identifiable, SelectableRenderItemProps } from '../utils/SelectableList'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import { FragranceAccord } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export interface SelectableAccordProps<T extends Identifiable> extends SelectableRenderItemProps<T> {
  originallySelected: boolean
}

const SelectableAccord: React.FC<SelectableAccordProps<FragranceAccord>> = (props: SelectableAccordProps<FragranceAccord>) => {
  const theme = useAppTheme()

  const { item: accord, selected, originallySelected } = props

  const bg = accord?.color || theme.colors.surfaceDisabled

  const selectedVotes = useMemo(() => {
    if (!accord) return 0

    const votes = accord.votes

    const addOne = !originallySelected && selected
    const subOne = originallySelected && !selected

    if (addOne) return votes + 1
    if (subOne) return votes - 1

    return votes
  }, [accord, originallySelected, selected])

  return (
    <View style={{ padding: 5 }}>
      <View style={[styles.accordItemWrapper, { borderColor: selected ? Colors.button : bg }]}>
        <View style={[
          styles.accordBackground,
          {
            backgroundColor: bg,
            transform: [{ scale: selected ? 0.94 : 1 }]
          }]}
        />
      </View>
      <View style={styles.accordName}>
        <Text numberOfLines={1} ellipsizeMode='tail'>{accord?.name.toLowerCase()}</Text>
        {selectedVotes > 0 && <Text>{selectedVotes}</Text>}
      </View>
    </View>
  )
}

export default SelectableAccord

const styles = StyleSheet.create({
  accordItemWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 3
  },
  accordBackground: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10
  },
  accordName: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10
  }
})
