import { Colors } from '@/src/constants/Colors'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Shimmer from '@/src/components/utils/Shimmer'

const FragranceBlockHorizontalCardLoading: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Shimmer style={styles.imageMask} />
      <View style={styles.bottomMask}>
        <Shimmer style={styles.nameMask} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  imageMask: {
    height: 150,
    width: 150,
    borderRadius: 20,
    backgroundColor: Colors.placeholder
  },
  bottomMask: {
    paddingLeft: 10,
    paddingRight: 10
  },
  nameMask: {
    width: '75%',
    height: 17,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: Colors.placeholder
  }
})

export default FragranceBlockHorizontalCardLoading
