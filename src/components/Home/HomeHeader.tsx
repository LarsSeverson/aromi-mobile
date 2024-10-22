import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TitleText from '../Utils/Text'

const HomeHeader = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.wrapper}>
      <View>
        <TitleText>aromi</TitleText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: 'white'
  }
})

export default HomeHeader
