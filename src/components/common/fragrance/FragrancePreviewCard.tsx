import { StyleSheet, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import BouncyButton, { type BouncyButtonProps } from '../BouncyButton'
import { Image } from 'expo-image'
import { useAppTheme } from '@/src/constants/Themes'
import { Icon, Text } from 'react-native-paper'
import VoteButton from '../VoteButton'
import { type FragranceImage, type Fragrance } from '@/src/generated/graphql'

export type CardFragrancePreview = Omit<Pick<Fragrance, 'id' | 'name' | 'brand' | 'votes'>, 'images'> & {
  images: FragranceImage[]
}

export interface FragrancePreviewCardProps extends BouncyButtonProps {
  fragrance: CardFragrancePreview

  onFragrancePress?: () => void
  onFragranceVote?: (myVote: boolean | null) => void
}

const FragrancePreviewCard = (props: FragrancePreviewCardProps) => {
  const theme = useAppTheme()
  const { fragrance, onFragrancePress, onFragranceVote, ...rest } = props

  const votes = useMemo(() =>
    fragrance.votes.likes - fragrance.votes.dislikes,
  [fragrance.votes])

  const handlePress = useCallback(() => {
    onFragrancePress?.()
  }, [onFragrancePress])

  const handleVote = useCallback((myVote: boolean | null) => {
    onFragranceVote?.(myVote)
  }, [onFragranceVote])

  return (
    <View style={styles.wrapper}>
      <BouncyButton
        onPress={handlePress}
        {...rest}
      >
        <View style={[styles.previewWrapper, { borderColor: theme.colors.surfaceDisabled }]}>
          <Image
            source={{ uri: fragrance.images.at(0)?.url }}
            style={styles.imgWrapper}
          />
          <VoteButton
            votes={votes}
            myVote={fragrance.votes.myVote}
            style={styles.reactionsWrapper}
            onVote={handleVote}
          />
        </View>
      </BouncyButton>
      <View>
        <View style={styles.headingWrapper}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.nameWrapper}
          >
            {fragrance.name}
          </Text>
          <BouncyButton>
            <Icon
              size={20}
              source='dots-horizontal'
            />
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

export default React.memo(FragrancePreviewCard)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 5,
    overflow: 'hidden'
  },
  previewWrapper: {
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1
  },
  imgWrapper: {
    position: 'relative',
    flex: 1
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
