import { StyleSheet, View, ViewProps } from 'react-native'
import React, { useCallback } from 'react'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

const getWidths = (value: number) => {
  if (value < 0 || value > 1) return { leftWidth: 0, rightWidth: 0 }
  if (value === 0.5) return { leftWidth: 10, rightWidth: 10 }
  if (value < 0.5) return { leftWidth: (value / 0.5) * 100, rightWidth: 0 }
  return { leftWidth: 0, rightWidth: ((value - 0.5) / 0.5) * 100 }
}

export interface ScaleBarProps extends ViewProps {
  value: number
  lessColor?: string
  greaterColor?: string
}

const ScaleBar: React.FC<ScaleBarProps> = (props: ScaleBarProps) => {
  const theme = useAppTheme()
  const { value, lessColor = Colors.pink, greaterColor = Colors.button, ...viewProps } = props

  if (value > 1.0 || value < 0.0) {
    return null
  }

  const { leftWidth, rightWidth } = getWidths(value)

  const viewStyle = StyleSheet.flatten(viewProps.style)

  return (
    <View {...viewProps} style={{ backgroundColor: theme.colors.surfaceDisabled, borderRadius: 20, height: 15, overflow: 'hidden', flexDirection: 'row', ...viewStyle }}>
      <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
        <View style={{ backgroundColor: lessColor, width: `${leftWidth}%`, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ backgroundColor: greaterColor, width: `${rightWidth}%`, borderTopRightRadius: 20, borderBottomRightRadius: 20 }} />
      </View>
    </View>
  )
}

export default ScaleBar

const styles = StyleSheet.create({})
