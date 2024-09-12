import { Colors } from '@/src/constants/Colors'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, View } from 'react-native'
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg'

const FragranceBlockRadialGradient = Animated.createAnimatedComponent(RadialGradient)

const FragranceBlockLoading: React.FC = () => {
  const animationRadius = useRef(new Animated.Value(90)).current
  const [radius, setRadius] = useState('90%')

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animationRadius, {
          toValue: 70,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false
        }),
        Animated.timing(animationRadius, {
          toValue: 100,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false
        }),
        Animated.timing(animationRadius, {
          toValue: 90,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false
        })
      ])
    )

    animation.start()

    return () => animation.stop()
  }, [animationRadius])

  useEffect(() => {
    const listener = animationRadius.addListener(({ value }) => {
      setRadius(`${value}%`)
    })

    return () => animationRadius.removeListener(listener)
  }, [animationRadius])

  return (
    <Svg viewBox='0 0 100 100' preserveAspectRatio='none'>
      <Defs>
        <FragranceBlockRadialGradient id='grad' cx='50%' cy='50%' r={radius}>
          <Stop offset='10%' stopColor={Colors.white} stopOpacity='0.01' />
          <Stop offset='60%' stopColor={Colors.black} stopOpacity='0.1' />
        </FragranceBlockRadialGradient>
      </Defs>
      <Rect x='0' y='0' width='100' height='100' fill='url(#grad)' />
    </Svg>
  )
}

export default FragranceBlockLoading
