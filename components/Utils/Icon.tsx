import { StyleSheet, View } from "react-native"
import { Svg, Path } from "react-native-svg"

export const Icon = ({ width = 24, height = 24, color = 'black', d = '' }) => {
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