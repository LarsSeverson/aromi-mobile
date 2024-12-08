import { Colors } from '@/src/constants/Colors'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
import { useAppTheme } from '@/src/constants/Themes'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const FragranceBlockVerticalCardLoading: React.FC = () => {
  const theme = useAppTheme()

  return (
    <View style={styles.wrapper}>
      <ShimmerPlaceholder style={styles.contentMask} />
      <ShimmerPlaceholder style={styles.nameMask} />
      <ShimmerPlaceholder style={styles.brandMask} />
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
