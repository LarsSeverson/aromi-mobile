import { StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import MiddleSlider from '../stats/MiddleSlider'
import ButtonText from '../utils/ButtonText'
import { Colors } from '@/src/constants/Colors'

export interface EditFragranceSliderProps {
  storedValue?: number
  leftLabel?: string
  rightLabel?: string
  icon?: React.ReactNode
  style?: ViewStyle
  onSubmit?: (value: number) => void
}

const EditFragranceSlider: React.FC<EditFragranceSliderProps> = (props: EditFragranceSliderProps) => {
  const { storedValue = 50, leftLabel = '', rightLabel = '', icon, onSubmit, style } = props
  const [submitDisabled, setSubmitDisabled] = React.useState(true)

  return (
    <View style={StyleSheet.compose(styles.wrapper, style)}>
      {icon}

      <View style={styles.storedDataContainer}>
        <View style={[styles.storedData, { width: 100 - storedValue, backgroundColor: Colors.pink }]} />
        <View style={[styles.storedData, { width: storedValue, backgroundColor: Colors.button }]} />
      </View>

      <MiddleSlider focusPoints={[25, 50, 75]} onInteracted={() => submitDisabled && setSubmitDisabled(false)} />

      <View style={styles.labelsWrapper}>
        <Text variant='titleSmall' style={{ opacity: 0.6 }}>{leftLabel}</Text>
        <Text variant='titleSmall' style={{ opacity: 0.6 }}>{rightLabel}</Text>
      </View>

      <ButtonText
        text='Submit'
        disabled={submitDisabled}
        color={Colors.button}
        textColor={Colors.white}
        onPress={() => onSubmit?.(storedValue)}
        style={{ opacity: submitDisabled ? 0.5 : 1 }}
      />
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
    overflow: 'hidden'
  },
  storedData: {
    height: '100%',
    borderRadius: 20
  },
  labelsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
