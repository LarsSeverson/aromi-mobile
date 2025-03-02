import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

export interface MiddleSliderProps {
  value?: number | undefined
  min?: number
  max?: number
  focusPoints?: number[]
  onValueChange?: (value: number) => void
  onInteracted?: () => void
}

const MiddleSlider = (props: MiddleSliderProps) => {
  const theme = useAppTheme()
  const {
    min = 0,
    max = 100,
    value = max / 2,
    focusPoints = [],
    onValueChange,
    onInteracted
  } = props

  const SNAP_THRESHOLD = 20

  const mounted = useRef(false)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [circleWidth, setCircleWidth] = useState<number>(0)
  const [maxOffset, setMaxOffset] = useState<number>(containerWidth - circleWidth)
  const [minOffset, setMinOffset] = useState<number>(0)
  const pressed = useSharedValue<boolean>(false)
  const offset = useSharedValue<number>(value)

  const adjustOffset = (x: number, time: number = 0) => {
    const newOffset = Math.round(Math.min(Math.max(x, minOffset), maxOffset))

    offset.value = withTiming(newOffset, { duration: time })
  }

  const snapToFocus = () => {
    focusPointPositions.forEach((point) => {
      const distance = Math.abs((offset.value + (circleWidth / 2)) - point)
      if (distance < SNAP_THRESHOLD) {
        offset.value = withTiming((point - (circleWidth / 2)), { duration: 200 })
      }
    })
  }

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onBegin((event) => {
      pressed.value = true

      const leftP = offset.value
      const rightP = offset.value + circleWidth
      const isInsideCircle = event.x >= leftP && event.x <= rightP

      if (!isInsideCircle) {
        runOnJS(adjustOffset)(event.x - (circleWidth / 2), 200)
      }
    })
    .onChange((event) => {
      runOnJS(adjustOffset)(offset.value + event.changeX)
    })
    .onFinalize(() => {
      pressed.value = false

      runOnJS(snapToFocus)()

      const newValue = min + (offset.value / (maxOffset - minOffset)) * (max - min)

      if (onInteracted != null) runOnJS(onInteracted)()
      if (onValueChange != null) runOnJS(onValueChange)(newValue)
    })

  useLayoutEffect(() => {
    if (containerWidth > 0 && circleWidth > 0) {
      const newMaxOffset = containerWidth - circleWidth
      const newMinOffset = 0

      setMaxOffset(newMaxOffset)
      setMinOffset(newMinOffset)

      const newOffset = Math.round(((value - min) / (max - min)) * newMaxOffset)

      offset.value = newOffset

      if (!mounted.current) mounted.current = true
    }
  }, [circleWidth, containerWidth, max, min, offset, value])

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: offset.value,
      transform: [{ scale: withTiming(pressed.value ? 1.05 : 1) }]
    }
  })

  const leftFilledAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: Math.min(offset.value + (circleWidth / 2), containerWidth / 2),
      width: Math.max((containerWidth / 2) - (offset.value + (circleWidth / 2)), 0)
    }
  })

  const rightFilledAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: 0,
      width: (containerWidth !== 0) ? Math.max((offset.value - containerWidth / 2) + (circleWidth / 2), 0) : 0
    }
  })

  const focusPointPositions = useMemo(() => {
    if (containerWidth === 0 || circleWidth === 0) return []

    return focusPoints
      .map((point) => {
        const clampedPoint = Math.min(Math.max(point, min), max)
        const relativePosition = (clampedPoint - min) / (max - min)
        const pos = relativePosition * containerWidth

        return pos
      })
      .filter((pos) => pos >= 0 && pos <= containerWidth)
  }, [containerWidth, circleWidth, focusPoints, max, min])

  return (
    <GestureDetector gesture={pan}>
      <View
        style={styles.sliderContainer}
        onLayout={(event) => { !mounted.current && setContainerWidth(event.nativeEvent.layout.width) }}
      >

        <View style={styles.trackContainer}>
          <View style={styles.trackHalfContainer}>
            <View style={[styles.trackHalfBackground, { backgroundColor: Colors.pink }]} />
            <Animated.View style={[leftFilledAnimatedStyle, styles.track, { backgroundColor: Colors.pink }]} />
          </View>
          <View style={styles.trackHalfContainer}>
            <View style={[styles.trackHalfBackground, { backgroundColor: Colors.button }]} />
            <Animated.View style={[rightFilledAnimatedStyle, styles.track, { backgroundColor: Colors.button }]} />
          </View>
        </View>

        {focusPointPositions.length > 0 && (
          <View style={styles.focusPointsContainer}>
            {focusPointPositions.map((position, index) => (
              <View
                key={index}
                style={[
                  styles.focusPointMark,
                  {
                    left: position,
                    backgroundColor: theme.colors.icon
                  }
                ]}
              />
            ))}
          </View>
        )}

        <Animated.View
          style={[styles.circle, thumbAnimatedStyle]}
          onLayout={(event) => { !mounted.current && setCircleWidth(event.nativeEvent.layout.width) }}
        />
      </View>
    </GestureDetector>
  )
}

export default MiddleSlider

const styles = StyleSheet.create({
  trackContainer: {
    height: 20,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  trackHalfContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
  },
  trackHalfBackground: {
    flex: 1,
    opacity: 0.1
  },
  track: {
    position: 'absolute',
    zIndex: 2,
    height: '100%'
  },
  sliderContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    position: 'absolute',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  focusPointsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  },
  focusPointMark: {
    position: 'absolute',
    width: 2,
    height: '33%',
    opacity: 0.2
  }
})
