import { Colors } from '@/src/constants/Colors'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Shimmer from '@/src/components/Utils/Shimmer'

const FragranceBlockVerticalCardLoading: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Shimmer style={styles.contentMask} />
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
  contentMask: {
    height: 200,
    borderRadius: 20,
    backgroundColor: Colors.placeholder
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
    backgroundColor: Colors.placeholder
  },
  brandMask: {
    width: '35%',
    height: 17,
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: Colors.placeholder
  }
})

export default FragranceBlockVerticalCardLoading
