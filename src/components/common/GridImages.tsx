import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useAppTheme } from '../../constants/Themes'

export interface GridImagesProps {
  images: (string | undefined)[]
  style?: ViewStyle
}

const GridImages = (props: GridImagesProps) => {
  const theme = useAppTheme()
  const { images } = props

  return (
    <View style={styles.wrapper}>
      {images.length === 1
        ? (
          <Image
            source={{ uri: images.at(0) }}
            style={[styles.fullImage, { backgroundColor: theme.colors.surfaceDisabled }]}
          />
          )
        : (
            images.slice(0, 4).map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={[styles.gridImage, { backgroundColor: theme.colors.surfaceDisabled }]}
              />
            ))
          )}
    </View>
  )
}

export default GridImages

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 50,
    height: 50,
    overflow: 'hidden'
  },
  gridImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    borderWidth: 1
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})
