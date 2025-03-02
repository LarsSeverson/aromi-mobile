import { useAppTheme } from '@/src/constants/Themes'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg, Path } from 'react-native-svg'

export interface IconProps {
  width: number
  height: number
  d: string
}

export const Icon = (props: IconProps) => {
  const { width = 24, height = 25, d = '' } = props
  const theme = useAppTheme()

  return (
    <View style={styles.wrapper}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill='none' style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d={d}
          fill={theme.colors.icon}
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
