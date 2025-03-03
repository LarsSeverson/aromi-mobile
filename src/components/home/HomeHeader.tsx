import { StyleSheet } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '@/src/constants/Themes'

const HomeHeader = () => {
  const theme = useAppTheme()

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.wrapper, { backgroundColor: theme.colors.background }]}
    >
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
    elevation: 5
  }
})

export default HomeHeader
