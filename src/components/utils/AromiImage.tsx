import { Image, ImageProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react'
import { getUrl } from 'aws-amplify/storage'

interface FragranceBlockImageProps {
  path: string | undefined
  style?: StyleProp<ViewStyle>
  children?: ReactNode
  imageProps?: ImageProps
}

const AromiImage: React.FC<FragranceBlockImageProps> = (props: FragranceBlockImageProps) => {
  const { path, imageProps } = props
  const [imageURL, setImageURL] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getImage = async () => {
      try {
        if (path) {
          const s3URL = await getUrl({
            path,
            options: {
              validateObjectExistence: true
            }
          })
          setImageURL(s3URL.url.toString())
        }
      } catch (err) {
        console.error('Failed to get image from s3:', err)
      } finally {
        setLoading(false)
      }
    }

    getImage()
  }, [path])

  if (!imageURL || loading) {
    return (
      <View style={props.style}>
        {props.children}
      </View>
    )
  }

  return (
    <View style={props.style}>
      <Image source={{ uri: imageURL }} {...imageProps} style={styles.imageWrapper} />
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1
  }
})

export default AromiImage
