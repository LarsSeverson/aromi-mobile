import { StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import MiddleSlider, { MiddleSliderProps } from '../stats/MiddleSlider'
import { Colors } from '@/src/constants/Colors'

export interface EditFragranceSliderProps extends MiddleSliderProps {
  storedValue?: number | undefined

  label?: string | undefined
  leftLabel?: string | undefined
  rightLabel?: string | undefined

  icon?: React.ReactNode | undefined

  style?: ViewStyle | undefined
}

const EditFragranceSlider: React.FC<EditFragranceSliderProps> = (props: EditFragranceSliderProps) => {
  const { storedValue = 50, label, leftLabel = '', rightLabel = '', icon, style, ...rest } = props

  return (
    <View style={StyleSheet.compose(styles.wrapper, style)}>
      {icon}

      {label && <Text style={{ alignSelf: 'center', margin: -10 }}>{label}</Text>}

      <View style={styles.storedDataContainer}>
        <View style={[styles.storedDataWrapper, { flexDirection: 'row-reverse' }]}>
          <View style={{ width: `${100 - storedValue}%`, borderRadius: 20, backgroundColor: Colors.pink }} />
        </View>
        <View style={styles.storedDataWrapper}>
          <View style={{ width: `${storedValue}%`, height: '100%', borderRadius: 20, backgroundColor: Colors.button }} />
        </View>
      </View>

      <MiddleSlider focusPoints={[16, 32, 50, 66, 84]} {...rest} />

      <View style={styles.labelsWrapper}>
        <Text style={{ opacity: 0.6 }}>{leftLabel}</Text>
        <Text style={{ opacity: 0.6 }}>{rightLabel}</Text>
      </View>
    </View>
  )
}

export default EditFragranceSlider

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
  }
})
