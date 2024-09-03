import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import TitleText from '../StyledComponents/Text'

const HomeHeader = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <TitleText>aromi</TitleText>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    paddingLeft: 10,
    elevation: 5
  }
})

export default HomeHeader
