import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Colors } from '@/constants/Colors'

export class HomeFragranceCard extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.imageBackground}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: 200,
    height: 200
  },
  imageBackground: {
    flex: 1,
    backgroundColor: Colors.black,
    opacity: 0.05,
    borderRadius: 20
  }
})

export default HomeFragranceCard