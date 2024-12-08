import { StyleSheet, View, ViewProps } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

export interface LinearScaleBarProps extends ViewProps {
  value: number
  color?: string
}

const LinearScaleBar: React.FC<LinearScaleBarProps> = (props: LinearScaleBarProps) => {
  const theme = useAppTheme()
  const { value, color = Colors.button, ...viewProps } = props

  if (value > 1.0 || value < 0.0) {
    return null
  }

  const viewStyle = StyleSheet.flatten(viewProps.style)

  return (
    <View {...viewProps} style={{ backgroundColor: theme.colors.surfaceDisabled, borderRadius: 20, height: 15, overflow: 'hidden', flexDirection: 'row', ...viewStyle }}>
      <View style={{ backgroundColor: color, width: `${value * 100}%`, borderTopRightRadius: 20, borderBottomRightRadius: 20 }} />
    </View>
  )
}

export default LinearScaleBar

const styles = StyleSheet.create({})
