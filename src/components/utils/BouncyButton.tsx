import { GestureResponderEvent, Pressable, PressableProps, ViewStyle } from 'react-native'
import React, { ReactNode, useRef } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export interface BouncyButtonProps extends PressableProps {
  children?: ReactNode
  scaleTo?: number
  contentStyle?: ViewStyle
}

const BouncyButton: React.FC<BouncyButtonProps> = (props: BouncyButtonProps) => {
  const { onPress, children, scaleTo = 0.98, contentStyle, ...restProps } = props
  const scale = useSharedValue(1)
  const longPressed = useRef(false)
  const isPressed = useSharedValue(false)

  const onPressInHandler = () => {
    isPressed.value = true
    scale.value = withSpring(scaleTo, { stiffness: 900, damping: 100 })
    longPressed.current = false
  }

  const onPressOutHandler = (event: GestureResponderEvent) => {
    isPressed.value = false
    scale.value = withSpring(1, { stiffness: 900, damping: 100 })
  }

  const onLongPressHandler = (event: GestureResponderEvent) => {
    longPressed.current = true
    onPressOutHandler(event)
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  })

  return (
    <Pressable
      {...restProps}
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}
      onPress={onPress}
      onLongPress={onLongPressHandler}
      delayLongPress={1000}
    >
      <Animated.View style={[contentStyle, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  )
}

export default BouncyButton
