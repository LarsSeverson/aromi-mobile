import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React from 'react'
import ImageCarousel from '../../common/ImageCarousel'
import BouncyButton from '../../common/BouncyButton'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'
import useFragranceImages from '@/src/hooks/useFragranceImages'

export interface FragranceImageCarouselProps {
  fragranceId: number
  onImagePressed?: (uri: string) => void
}

const FragranceImageCarousel = (props: FragranceImageCarouselProps) => {
  const { width } = useWindowDimensions()
  const { fragranceId } = props

  const { data: images } = useFragranceImages(fragranceId)

  return (
    <View style={styles.wrapper}>
      <ImageCarousel
        urls={images.map(image => image.url)}
        width={width}
        height={400}
      />
      <BouncyButton style={styles.optionsButton}>
        <Icon
          name='dots-vertical'
          type='material-community'
          backgroundColor={Colors.placeholder2}
          style={styles.icon}
          size={22}
        />
      </BouncyButton>
      <BouncyButton style={styles.collectionButton}>
        <Icon
          name='plus-circle-outline'
          type='material-community'
          backgroundColor={Colors.placeholder2}
          style={styles.icon}
          size={22}
        />
      </BouncyButton>
    </View>
  )
}

export default FragranceImageCarousel

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative'
  },
  icon: {
    padding: 7,
    borderRadius: 50
  },
  optionsButton: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  collectionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20
  }
})
