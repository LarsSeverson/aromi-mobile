import { StyleSheet, View, type ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useCallback } from 'react'
import MiddleSlider, { type MiddleSliderProps } from '../MiddleSlider'
import { Colors } from '@/src/constants/Colors'
import { type FragranceTrait } from '@/src/generated/graphql'

export type CardFragranceTrait = Pick<FragranceTrait, 'id' | 'value' | 'trait' | 'myVote'>

export interface TraitSliderProps extends MiddleSliderProps {
  trait: CardFragranceTrait

  label?: string | undefined
  leftLabel?: string | undefined
  rightLabel?: string | undefined

  icon?: React.ReactNode | undefined

  style?: ViewStyle | undefined

  onTraitChanged?: (value: number, trait: CardFragranceTrait) => void
}

const TraitSlider = (props: TraitSliderProps) => {
  const {
    trait,
    label,
    leftLabel = '',
    rightLabel = '',
    icon,
    style,
    onTraitChanged,
    ...rest
  } = props

  const handleValueChanged = useCallback((value: number) => {
    onTraitChanged?.(value, trait)
  }, [trait, onTraitChanged])

  return (
    <View style={StyleSheet.compose(styles.wrapper, style)}>
      {icon}

      {(label != null) && (
        <Text style={styles.label}>
          {label}
        </Text>)}

      <View style={styles.storedDataContainer}>
        <View style={[styles.storedDataWrapper, { flexDirection: 'row-reverse' }]}>
          <View style={[styles.leftTrack, { width: `${100 - trait.value}%` }]} />
        </View>
        <View style={styles.storedDataWrapper}>
          <View style={[styles.rightTrack, { width: `${trait.value}%` }]} />
        </View>
      </View>

      <MiddleSlider
        value={trait.myVote ?? undefined}
        focusPoints={[16, 32, 50, 66, 84]}
        {...rest}
        onValueChange={handleValueChanged}
      />

      <View style={styles.labelsWrapper}>
        <Text style={{ opacity: 0.6 }}>{leftLabel}</Text>
        <Text style={{ opacity: 0.6 }}>{rightLabel}</Text>
      </View>
    </View>
  )
}

export default TraitSlider

const styles = StyleSheet.create({
  wrapper: {
    gap: 20
  },
  storedDataContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 3,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center'
  },
  storedDataWrapper: {
    borderRadius: 20,
    flex: 1
  },
  labelsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftTrack: {
    borderRadius: 20,
    backgroundColor: Colors.pink
  },
  rightTrack: {
    borderRadius: 20,
    backgroundColor: Colors.button
  },
  label: {
    alignSelf: 'center',
    margin: -10
  }
})
