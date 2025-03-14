import { type LayoutChangeEvent, StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import LinearScaleBar from '../../common/LinearScaleBar'
import { Text } from 'react-native-paper'
import { type CardFragranceAccord } from './FragranceAccordCard'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export interface AccordBarsProps {
  accords: CardFragranceAccord[]
  maxVote: number
}

const AccordsLadder = (props: AccordBarsProps) => {
  const { accords, maxVote } = props
  const wrapperOpacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: wrapperOpacity.value
  }))

  const getWidth = useCallback((votes: number) => {
    return votes / maxVote * 100
  }, [maxVote])

  const wrapperTransition = useCallback((event: LayoutChangeEvent) => {
    wrapperOpacity.value = withTiming(1, { duration: 300 })
  }, [wrapperOpacity])

  return (
    <Animated.View style={[animatedStyle]}>
      <View
        onLayout={wrapperTransition}
        style={styles.wrapper}
      >
        {accords.map((accord, index) => {
          return (
            <View key={index}>
              <Text style={{ marginHorizontal: 10 }}>
                {accord.name}
              </Text>
              <LinearScaleBar
                key={index}
                value={getWidth(accord.votes)}
                color={accord.color}
              />
            </View>
          )
        })}
      </View>
    </Animated.View>
  )
}

export default AccordsLadder

const styles = StyleSheet.create({
  wrapper: {
    gap: 10
  }
})
