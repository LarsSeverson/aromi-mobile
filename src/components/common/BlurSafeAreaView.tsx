import React from 'react'
import { BlurView } from 'expo-blur'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, type ViewProps } from 'react-native'

export interface BlurSafeAreaViewProps extends ViewProps {
  children: React.ReactNode
  intensity: number
}

const BlueSafeAreaView = (props: BlurSafeAreaViewProps) => {
  const { children, intensity, ...rest } = props

  return (
    <SafeAreaView
      edges={['top']}
      {...rest}
    >
      <BlurView
        intensity={intensity}
        style={[StyleSheet.absoluteFill]}
      />
      {children}
    </SafeAreaView>
  )
}

export default BlueSafeAreaView
