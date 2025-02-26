import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import BouncyButton, { BouncyButtonProps } from '../common/BouncyButton'
import { Image } from 'expo-image'
import { useAppTheme } from '@/src/constants/Themes'
import { Icon, Text } from 'react-native-paper'
import VoteButton from '../common/VoteButton'

export interface FragrancePreviewProps extends BouncyButtonProps {
  fragrance: Fragrance

  onFragrancePress?: (fragranceId: number) => void
  onFragranceVote?: (fragrance: Fragrance, myVote: boolean | null) => void
}

const FragrancePreview: React.FC<FragrancePreviewProps> = (props: FragrancePreviewProps) => {
  const theme = useAppTheme()
  const { fragrance, onFragrancePress, onFragranceVote, ...rest } = props
  const votes = fragrance.vote.likes - fragrance.vote.dislikes

  const handlePress = useCallback(() => {
    onFragrancePress?.(fragrance.id)
  }, [fragrance.id, onFragrancePress])

  const handleVote = useCallback((myVote: boolean | null) => {
    onFragranceVote?.(fragrance, myVote)
  }, [fragrance, onFragranceVote])

  return (
    <View style={styles.wrapper}>
      <BouncyButton onPress={handlePress} {...rest}>
        <View style={[styles.previewWrapper, { backgroundColor: theme.colors.surfaceDisabled }]}>
          <Image source={{ uri: fragrance.images.at(0)?.url }} style={styles.imgWrapper} />
          <VoteButton
            votes={votes}
            myVote={fragrance.vote.myVote}
            style={styles.reactionsWrapper}
            onVote={handleVote}
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

export default FragrancePreview

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 5,
    overflow: 'hidden'
  },
  previewWrapper: {
    aspectRatio: 1,
    borderRadius: 15,
    overflow: 'hidden'
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
