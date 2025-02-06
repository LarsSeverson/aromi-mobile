import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { useAppTheme } from '@/src/constants/Themes'
import BouncyButton from '../../BouncyButton'
import { Divider } from 'react-native-elements'
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AIcon from 'react-native-vector-icons/AntDesign'
import { Colors } from '@/src/constants/Colors'

export interface FragranceReactionsProps {
  numLikes: number
  numDislikes: number

  size?: number | undefined

  style?: ViewStyle
}

const FragranceReactions: React.FC<FragranceReactionsProps> = (props: FragranceReactionsProps) => {
  const theme = useAppTheme()

  const {
    numLikes,
    numDislikes,
    size = 15,
    style
  } = props

  const [liked, setLiked] = useState<boolean | null>(null)

  const curLikes = useMemo(() => {
    const count = numLikes - numDislikes

    if (liked) return count + 1
    if (liked === false) return count - 1

    return count
  }, [liked, numLikes, numDislikes])

  const onLiked = () => {
    setLiked(liked ? null : true)
  }

  const onDisliked = () => {
    setLiked(liked === false ? null : false)
  }

  return (
    <View style={[StyleSheet.compose(styles.wrapper, style), { backgroundColor: theme.colors.background }]}>
      <BouncyButton style={styles.contentBtnWrapper} contentStyle={styles.contentWrapper}>
        <CIcon
          name={liked ? 'heart' : 'heart-outline'}
          size={size}
          color={liked ? Colors.heart : theme.colors.icon}
        />
        <Text style={styles.contentTxtWrapper}>{curLikes}</Text>
      </BouncyButton>
      <Divider orientation='vertical' width={1} color={theme.colors.icon} />
      <BouncyButton style={styles.contentBtnWrapper}>
        <AIcon
          name={liked === false ? 'dislike1' : 'dislike2'}
          size={size}
          color={liked === false ? Colors.som : theme.colors.icon}
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
