import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg, Path } from 'react-native-svg'

interface IconProps {
  width: number,
  height: number
  color: string
  d: string
}

export const Icon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black', d = '' }) => {
  return (
    <View style={styles.wrapper}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill='none'>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d={d}
          fill={color}
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
