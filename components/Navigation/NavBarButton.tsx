import React, { useRef } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Icons from '@/constants/Icons'
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated'

interface NavBarButtonProps {
  routeName: string
  onPressed: any
  isFocused: boolean
}

const NavBarButton: React.FC<NavBarButtonProps> = ({
  routeName,
  onPressed,
  isFocused
}) => {
  const Icon = Icons[routeName as keyof typeof Icons]

  const scale = useSharedValue(1)
  const longPressed = useRef(false)
  const isPressed = useSharedValue(false)

  const opacity = useDerivedValue(() => {
    if (isFocused || isPressed.value) {
      return 1.0
    }

    return 0.69
  })

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value
    }
  })

  const onPressIn = () => {
    isPressed.value = true

    scale.value = withSpring(0.95, {
      stiffness: 500,
      damping: 100
    })

    longPressed.current = false
  }

  const onPressOut = () => {
    isPressed.value = false

    if (!longPressed.current) {
      onPressed()
    }
    scale.value = withSpring(1, {
      stiffness: 500,
      damping: 100
    })
  }

  const onLongPress = () => {
    longPressed.current = true
    onPressOut()
  }

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      delayLongPress={1000}
      style={styles.container}
    >
      <Animated.View style={animatedIconStyle}>
        <Icon style={{ borderWidth: 1 }} />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '20%',
    padding: 10
  }
})

export default NavBarButton
