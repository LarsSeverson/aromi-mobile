import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import BlockButton from '../Misc/BlockButton'
import FragranceBlockLoading from './Utils/FragranceBlockLoading'

const FragranceBlockVerticalCard: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const loading = props.loading
  const error = props.error

  if (loading || error) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.imageBackground}>
          <FragranceBlockLoading />
        </View>
      </View>
    )
  }

  return (
    <BlockButton>
      <View style={styles.wrapper}>
        <View style={styles.imageBackground} />
      </View>
    </BlockButton>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: 200,
    height: 200
  },
  imageBackground: {
    flex: 1,

    borderRadius: 20,
    overflow: 'hidden'
  }
})

export default FragranceBlockVerticalCard
