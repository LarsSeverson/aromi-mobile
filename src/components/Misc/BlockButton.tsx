import { GestureResponderEvent, Pressable, PressableProps, PressableStateCallbackType, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { createContext, ReactNode, useMemo, useRef } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

interface BlockButtonProps extends PressableProps {
    children?: ReactNode,
    scaleTo?: number
}

const BlockButton: React.FC<BlockButtonProps> = (props: BlockButtonProps) => {
  const scale = useSharedValue(1)
  const longPressed = useRef(false)
  const isPressed = useSharedValue(false)

  const scaleTo = props.scaleTo || 0.98

  const onPressIn = () => {
    isPressed.value = true

    scale.value = withSpring(scaleTo, {
      stiffness: 900,
      damping: 100
    })

    longPressed.current = false
  }

  const onPressOut = (event: GestureResponderEvent) => {
    isPressed.value = false

    if (!longPressed.current) {
      if (props.onPress && typeof props.onPress === 'function') {
        props.onPress(event)
      }
    }
    scale.value = withSpring(1, {
      stiffness: 900,
      damping: 100
    })
  }

  const onLongPress = (event: GestureResponderEvent) => {
    longPressed.current = true

    if (props.onPressOut) {
      props.onPressOut(event)
    } else {
      scale.value = withSpring(1, {
        stiffness: 900,
        damping: 100
      })
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  })

  return (
    <Pressable
      {...props}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      delayLongPress={1000}
    >
      <Animated.View style={animatedStyle}>
        {props.children}
      </Animated.View>
    </Pressable>
  )
}

export default BlockButton
