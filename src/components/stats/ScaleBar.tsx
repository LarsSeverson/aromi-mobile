import { StyleSheet, View, ViewProps } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

const getWidths = (value: number) => {
  if (value === 50.0) return { leftWidth: 10, rightWidth: 10 }
  if (value < 50.0) return { leftWidth: value, rightWidth: 0 }
  return { leftWidth: 0, rightWidth: value }
}

export interface ScaleBarProps extends ViewProps {
  value: number
  label?: string
  lessColor?: string
  greaterColor?: string
  lessLabel?: string
  greaterLabel?: string

  Icon?: React.ReactNode
}

const ScaleBar: React.FC<ScaleBarProps> = (props: ScaleBarProps) => {
  const theme = useAppTheme()
  const { value, label, lessColor = Colors.pink, greaterColor = Colors.button, lessLabel, greaterLabel, Icon, ...viewProps } = props

  if (value > 100.0 || value < 0.0) {
    return null
  }

  const { leftWidth, rightWidth } = getWidths(value)

  const viewStyle = StyleSheet.flatten(viewProps.style)

  return (
    <View {...viewProps} style={{ alignItems: 'center', justifyContent: 'center', ...viewStyle }}>
      {Icon}
      <Text style={{ marginTop: 2, marginBottom: 10 }}>{label}</Text>
      <View style={{ backgroundColor: theme.colors.surfaceDisabled, borderRadius: 20, height: 15, overflow: 'hidden', flexDirection: 'row' }}>
        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
          <View style={{ backgroundColor: lessColor, width: `${leftWidth}%`, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ backgroundColor: greaterColor, width: `${rightWidth}%`, borderTopRightRadius: 20, borderBottomRightRadius: 20 }} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        {lessLabel && <Text style={{ opacity: 0.6 }}>{lessLabel}</Text>}
        {greaterLabel && <Text style={{ marginLeft: 'auto', opacity: 0.6 }}>{greaterLabel}</Text>}
      </View>
    </View>

  )
}

export default ScaleBar

const styles = StyleSheet.create({})
