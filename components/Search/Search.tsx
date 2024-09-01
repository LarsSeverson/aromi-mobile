import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Search: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Search</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
})

export default Search
