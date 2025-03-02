import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView, type SafeAreaViewProps } from 'react-native-safe-area-context'

export interface NotifyProps extends SafeAreaViewProps {
  children: React.ReactNode
}

export const Notify = (props: NotifyProps) => {
  const { children, ...restProps } = props

  return (
    <SafeAreaView {...restProps}>
      <View style={styles.notifyWrapper}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  notifyWrapper: {
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
