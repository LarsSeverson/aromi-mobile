import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Profile: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
})

export default Profile
