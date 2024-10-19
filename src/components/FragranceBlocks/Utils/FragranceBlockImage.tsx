import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/src/constants/Colors'

interface FragranceBlockImageProps {
  url: string | undefined
}

const FragranceBlockImage: React.FC<FragranceBlockImageProps> = (props: FragranceBlockImageProps) => {
  const { url } = props
  const [imageURL, setImageURL] = useState(url)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getImage = async () => {
      try {
        if (url) {
          // const s3URL = await Storage.get('public/fragrance_images/71947/69.jpg')
          // console.log(s3URL)

          // setImageURL(s3URL)
        }
      } catch (err) {
        console.log('Failed to get image from s3:', err)
      } finally {
        setLoading(false)
      }
    }

    getImage()
  }, [url])

  return (
    <Image source={{ uri: imageURL }} style={styles.wrapper} />
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200
    // flex: 1,
    // zIndex: 0,
    // borderRadius: 20,
    // height: 200,
    // overflow: 'hidden',
    // position: 'relative'
  }
})

export default FragranceBlockImage
