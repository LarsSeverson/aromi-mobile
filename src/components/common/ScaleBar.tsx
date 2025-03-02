import { StyleSheet, View, type ViewProps } from 'react-native'
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

const ScaleBar = (props: ScaleBarProps) => {
  const theme = useAppTheme()
  const { value, label, lessColor = Colors.pink, greaterColor = Colors.button, lessLabel, greaterLabel, Icon, ...viewProps } = props

  if (value > 100.0 || value < 0.0) {
    return null
  }

  const { leftWidth, rightWidth } = getWidths(value)

  const viewStyle = StyleSheet.flatten(viewProps.style)

  return (
    <View
      {...viewProps}
      style={[styles.wrapper, viewStyle]}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.trackContainer, { backgroundColor: theme.colors.surfaceDisabled }]}>
        <View style={styles.trackWrapper}>
          <View style={[styles.track, { backgroundColor: lessColor, width: `${leftWidth}%` }]} />
        </View>
        <View style={styles.trackWrapper}>
          <View style={[styles.track, { backgroundColor: greaterColor, width: `${rightWidth}%` }]} />
        </View>
      </View>
      <View style={styles.footLabelWrapper}>
        {(lessLabel != null) && <Text style={styles.footLabel}>{lessLabel}</Text>}
        {(greaterLabel != null) && <Text style={styles.footLabel}>{greaterLabel}</Text>}
      </View>
    </View>

  )
}

export default ScaleBar

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginTop: 2,
    marginBottom: 10
  },
  trackContainer: {
    borderRadius: 20,
    height: 15,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  trackWrapper: {
    flex: 1,
    flexDirection: 'row-reverse'
  },
  track: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  footLabelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footLabel: {
    opacity: 0.6
  }
})
