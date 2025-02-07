import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useAppTheme } from '@/src/constants/Themes'
import BouncyButton from '../../BouncyButton'
import { Divider } from 'react-native-elements'
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AIcon from 'react-native-vector-icons/AntDesign'
import { Colors } from '@/src/constants/Colors'
import useReactToFragrance from '@/src/hooks/useReactToFragance'
import { FragranceReactionType } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export interface FragranceReactionsProps {
  fragranceId: number
  numLikes: number
  numDislikes: number

  liked?: boolean | undefined

  size?: number | undefined

  style?: ViewStyle
}

const FragranceReactions: React.FC<FragranceReactionsProps> = (props: FragranceReactionsProps) => {
  const theme = useAppTheme()

  const {
    fragranceId,
    numLikes,
    numDislikes,
    liked = false,
    size = 15,
    style
  } = props

  const { reaction, loading, error, reactToFragrance } = useReactToFragrance()

  const [curLiked, setCurLiked] = useState<boolean | null>(liked)

  const curLikes = useMemo(() => {
    const count = numLikes - numDislikes

    const getReactionValue = (reaction: boolean | null) =>
      reaction === true
        ? 1
        : reaction === false
          ? -1
          : 0

    return count - getReactionValue(liked) + getReactionValue(curLiked)
  }, [numLikes, numDislikes, liked, curLiked])

  const onLiked = () => {
    const newLiked = curLiked ? null : true

    setCurLiked(newLiked)
    reactToFragrance(
      {
        fragranceId,
        reaction: FragranceReactionType.LIKE,
        myReaction: newLiked
      })
  }

  const onDisliked = () => {
    const newLiked = curLiked === false ? null : false

    setCurLiked(newLiked)
    reactToFragrance({
      fragranceId,
      reaction: FragranceReactionType.LIKE,
      myReaction: newLiked
    })
  }

  return (
    <View style={[StyleSheet.compose(styles.wrapper, style), { backgroundColor: theme.colors.background }]}>
      <BouncyButton
        style={styles.contentBtnWrapper}
        contentStyle={styles.contentWrapper}
        onPress={onLiked}
      >
        <CIcon
          name={curLiked ? 'heart' : 'heart-outline'}
          size={size}
          color={curLiked ? Colors.heart : theme.colors.icon}
        />
        <Text style={styles.contentTxtWrapper}>{curLikes}</Text>
      </BouncyButton>
      <Divider orientation='vertical' width={1} color={theme.colors.icon} />
      <BouncyButton
        style={styles.contentBtnWrapper}
        onPress={onDisliked}
      >
        <AIcon
          name={curLiked === false ? 'dislike1' : 'dislike2'}
          size={size}
          color={curLiked === false ? Colors.som : theme.colors.icon}
        />
      </BouncyButton>
    </View>
  )
}

export default FragranceReactions

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: 5,
    height: 28
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  contentBtnWrapper: {
    paddingHorizontal: 10
  },
  contentTxtWrapper: {
    fontSize: 12,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
