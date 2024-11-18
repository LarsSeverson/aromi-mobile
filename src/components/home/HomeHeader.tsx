import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'aws-amplify/auth'

const HomeHeader = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.wrapper}>
      <Text variant='headlineLarge'>aromi</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: 'white'
  }
})

export default HomeHeader
