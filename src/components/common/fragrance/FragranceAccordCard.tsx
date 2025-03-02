import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useMemo } from 'react'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import { type FragranceAccord } from '@/src/generated/graphql'

export type CardFragranceAccord = Pick<FragranceAccord, 'id' | 'accordId' | 'name' | 'votes' | 'color' | 'myVote'>

export interface FragranceAccordCardProps {
  accord: CardFragranceAccord
  selected?: boolean | undefined
}

const FragranceAccordCard = (props: FragranceAccordCardProps) => {
  const theme = useAppTheme()

  const {
    accord,
    selected
  } = props

  const bg = accord?.color ?? theme.colors.surfaceDisabled

  const selectedVotes = useMemo(() => {
    if (accord == null) return 0

    const originallySelected = accord.myVote === true
    const votes = accord.votes

    const addOne = !originallySelected && (selected ?? false)
    const subOne = originallySelected && !(selected ?? false)

    if (addOne) return votes + 1
    if (subOne) return votes - 1

    return votes
  }, [accord, selected])

  return (
    <View style={{ padding: 5 }}>
      <View style={[styles.accordItemWrapper, { borderColor: (selected ?? false) ? Colors.button : bg }]}>
        <View style={[
          styles.accordBackground,
          {
            backgroundColor: bg,
            transform: [{ scale: (selected ?? false) ? 0.94 : 1 }]
          }]}
        />
      </View>
      <View style={styles.accordName}>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {accord?.name.toLowerCase()}
        </Text>
        {selectedVotes > 0 && <Text>{selectedVotes}</Text>}
      </View>
    </View>
  )
}

export default FragranceAccordCard

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
