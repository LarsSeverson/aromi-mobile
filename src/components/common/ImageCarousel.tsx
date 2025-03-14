import { StyleSheet, View, FlatList, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { Text } from 'react-native-paper'
import { useAppTheme } from '../../constants/Themes'

export interface ImageCarouselProps {
  urls: string[]
  width: number
  height: number
}

const ImageCarousel = (props: ImageCarouselProps) => {
  const theme = useAppTheme()
  const { width, height, urls } = props
  const empty = urls.length === 0
  const [activeIndex, setActiveIndex] = useState(0)

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width)
    setActiveIndex(slide)
  }

  if (empty) {
    return (
      <View style={[styles.placeholderWrapper, { height, backgroundColor: theme.colors.surfaceDisabled }]}>
        <Text variant='titleMedium'>No images available yet</Text>
      </View>
    )
  }

  return (
    <View style={[styles.wrapper, { height }]}>
      <FlatList
        data={urls}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ height: '100%' }}
        onScroll={onScroll}
        renderItem={({ item: uri }) => (
          <Image source={{ uri }} style={[styles.image, { width }]} />
        )}
      />
      <View style={styles.pagination}>
        {urls.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  )
}

export default ImageCarousel

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative'
  },
  placeholderWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7
  },
  image: {
    height: '100%'
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    margin: 4
  },
  activeDot: {
    backgroundColor: '#fff'
  }
})
