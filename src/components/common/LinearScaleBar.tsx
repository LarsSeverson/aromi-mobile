import { type StyleProp, StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'

export interface LinearScaleBarProps extends ViewProps {
  value: number
  color?: string
}

const LinearScaleBar = (props: LinearScaleBarProps) => {
  const { value, color = Colors.button, ...viewProps } = props

  if (value > 100.0 || value < 0.0) {
    return null
  }

  const viewStyle: StyleProp<ViewStyle> = StyleSheet.compose(styles.wrapper, viewProps.style)

  return (
    <View
      {...viewProps}
      style={viewStyle}
    >
      <View style={{ backgroundColor: color, width: `${value}%`, borderRadius: 20 }} />
    </View>
  )
}

export default LinearScaleBar

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    height: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    flex: 1
  }
})
