import { Colors } from '@/src/constants/Colors'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Shimmer from '../../Misc/Shimmer'

const FragranceBlockVerticalCardLoading: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Shimmer style={styles.imageMask} />
      <View style={styles.bottomMask}>
        <Shimmer style={styles.nameMask} />
        <Shimmer style={styles.brandMask} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  imageMask: {
    height: 200,
    borderRadius: 20,
    backgroundColor: Colors.black,
    opacity: 0.1
  },
  bottomMask: {
    paddingLeft: 10,
    paddingRight: 10
  },
  nameMask: {
    width: '75%',
    height: 20,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: Colors.black,
    opacity: 0.1
  },
  brandMask: {
    width: '35%',
    height: 17,
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: Colors.black,
    opacity: 0.1
  }
})

export default FragranceBlockVerticalCardLoading
