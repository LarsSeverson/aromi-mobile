import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import BouncyButton from '../../BouncyButton'
import useS3Image from '@/src/hooks/useS3Image'
import { Image } from 'expo-image'
import { useAppTheme } from '@/src/constants/Themes'
import { Icon, Text } from 'react-native-paper'
import FragranceReactions from './FragranceReactions'

export interface FragranceBlockProps {
  fragrance: Fragrance
}

const FragranceBlock: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const theme = useAppTheme()

  const { fragrance } = props

  const { path, loading: imgLoading } = useS3Image(fragrance.images?.[0]?.url)

  return (
    <View style={styles.wrapper}>
      <BouncyButton>
        <View style={[styles.previewWrapper, { backgroundColor: theme.colors.surfaceDisabled }]}>
          <Image source={{ uri: path || undefined }} style={styles.imgWrapper} />
          <FragranceReactions
            numLikes={fragrance.reactions.likes}
            numDislikes={fragrance.reactions.dislikes}
            style={styles.reactionsWrapper}
          />
        </View>
      </BouncyButton>
      <View>
        <View style={styles.headingWrapper}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={styles.nameWrapper}>
            {fragrance.name}
          </Text>
          <BouncyButton>
            <Icon size={20} source='dots-horizontal' />
          </BouncyButton>
        </View>
        <Text
          variant='labelSmall'
          numberOfLines={1}
          ellipsizeMode='tail'
          style={styles.brandWrapper}
        >
          {fragrance.brand}
        </Text>
      </View>
    </View>
  )
}

export default FragranceBlock

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 5,
    overflow: 'hidden'
  },
  previewWrapper: {
    aspectRatio: 1,
    borderRadius: 15
  },
  imgWrapper: {
    position: 'relative'
  },
  reactionsWrapper: {
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
    right: 10
  },
  headingWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  nameWrapper: {
    opacity: 0.95,
    flex: 1
  },
  brandWrapper: {
    opacity: 0.8
  }
})
