import { Colors } from '@/src/constants/Colors'
import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, Animated, ViewStyle, LayoutChangeEvent } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

interface ShimmerProps {
  style?: ViewStyle
  children?: React.ReactNode
}

const Shimmer: React.FC<ShimmerProps> = ({ style, children }) => {
  const shimmerAnim = useRef(new Animated.Value(-200)).current
  const [layoutWidth, setLayoutWidth] = useState(0)

  useEffect(() => {
    const animate = () => {
      shimmerAnim.setValue(-200)
      Animated.timing(shimmerAnim, {
        toValue: layoutWidth,
        duration: 2000,
        useNativeDriver: true
      }).start(() => {
        setTimeout(animate, 0)
      })
    }

    if (layoutWidth > 0) {
      animate()
    }
  }, [layoutWidth, shimmerAnim])

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setLayoutWidth(width)
  }

  return (
    <View style={[style, { overflow: 'hidden' }]} onLayout={onLayout}>
      {children}
      {layoutWidth > 0 && (
        <AnimatedLinearGradient
          colors={[Colors.placeholder, Colors.white, Colors.placeholder]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.shimmerOverlay,
            {
              width: 200,
              transform: [{ translateX: shimmerAnim }]
            }
          ]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  shimmerOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0
  }
})

export default Shimmer
