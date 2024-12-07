import { Colors } from '@/src/constants/Colors'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const FragranceBlockVerticalCardLoading: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <ShimmerPlaceholder style={styles.contentMask} duration={2000} />
      <ShimmerPlaceholder style={styles.nameMask} duration={2000} />
      <ShimmerPlaceholder style={styles.brandMask} duration={2000} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  contentMask: {
    height: 200,
    borderRadius: 20
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
    borderRadius: 15
  },
  brandMask: {
    width: '35%',
    height: 17,
    marginBottom: 12,
    borderRadius: 15
  }
})

export default FragranceBlockVerticalCardLoading
