import { StyleSheet, View, type ViewStyle } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useAppTheme } from '../../constants/Themes'

export interface GridImagesProps {
  images: Array<string | undefined>
  style?: ViewStyle
}

const GridImages = (props: GridImagesProps) => {
  const theme = useAppTheme()
  const { images } = props

  return (
    <View style={[styles.wrapper, { borderColor: theme.colors.surfaceDisabled }]}>
      {images.length < 4
        ? (
          <Image
            source={{ uri: images.at(0) }}
            style={styles.fullImage}
          />
          )
        : (
            images.slice(0, 4).map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.gridImage}
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
    overflow: 'hidden',
    borderWidth: 1
  },
  gridImage: {
    width: '50%',
    height: '50%'
  },
  fullImage: {
    width: '100%',
    height: '100%'
  }
})
