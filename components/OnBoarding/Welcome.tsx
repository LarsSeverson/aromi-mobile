import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TextStyles } from '@/constants/TextStyles'
import { Colors } from '@/constants/Colors'
import { Svg, Defs, RadialGradient, Rect, Stop } from 'react-native-svg'




const WelcomeRadialGradient = Animated.createAnimatedComponent(RadialGradient)

const WelcomeBackground = () => {
  const animationRadius = useRef(new Animated.Value(90)).current
  const [radius, setRadius] = useState('90%')

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animationRadius, {
          toValue: 100,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: false
        }),
        Animated.timing(animationRadius, {
          toValue: 90,
          duration: 5000,
          easing: Easing.linear,
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
        <WelcomeRadialGradient id='grad' cx='50%' cy='50%' r={radius}>
          <Stop offset="17%" stopColor="#FF9D61" stopOpacity="1" />
          <Stop offset="50%" stopColor={Colors.aromiLight.primary.tawny} stopOpacity="1" />
          <Stop offset="100%" stopColor={Colors.aromiLight.primary.tawny} stopOpacity="1" />
        </WelcomeRadialGradient>
      </Defs>
      <Rect x='0' y='0' width='100' height='100' fill='url(#grad)' />
    </Svg>
  )
}

const Welcome = () => {
  return (
    <View style={styles.wrapper}>
      <WelcomeBackground />
      <Text style={[styles.overlay, TextStyles.aromiTitle]}>
        aromi
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute'
  }
})

export default Welcome