import { type StyleProp, StyleSheet, Text, View, type ViewStyle } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useAppTheme } from '@/src/constants/Themes'
import BouncyButton from './BouncyButton'
import { Divider, Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'

export interface VoteButtonProps {
  votes: number
  size?: number | undefined
  myVote?: boolean | null
  style?: ViewStyle | undefined

  onRenderForIcon?: (active: boolean) => React.ReactNode
  onRenderAgainstIcon?: (active: boolean) => React.ReactNode
  onVote?: (vote: boolean | null) => void
}

const VoteButton = (props: VoteButtonProps) => {
  const theme = useAppTheme()

  const {
    votes,
    size = 15,
    style,
    myVote = null,

    onRenderForIcon,
    onRenderAgainstIcon,

    onVote
  } = props

  const [curVote, setCurVote] = useState<boolean | null>(myVote)

  const curVotes = useMemo(() => {
    const getVoteValue = (vote: boolean | null) => vote === true ? 1 : vote === false ? -1 : 0

    return votes - getVoteValue(myVote) + getVoteValue(curVote)
  }, [votes, myVote, curVote])

  const onFor = () => {
    const newVote = (curVote ?? false) ? null : true
    setCurVote(newVote)
    onVote?.(newVote)
  }

  const onAgainst = () => {
    const newVote = curVote === false ? null : false
    setCurVote(newVote)
    onVote?.(newVote)
  }

  const isForActive = curVote === true
  const isAgainstActive = curVote === false
  const viewStyle: StyleProp<ViewStyle> = StyleSheet.compose(styles.wrapper, style)

  return (
    <View style={[
      viewStyle,
      {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.onSurfaceDisabled
      }]}
    >
      <BouncyButton
        style={styles.contentBtnWrapper}
        contentStyle={styles.contentWrapper}
        onPress={onFor}
      >
        {(onRenderForIcon != null)
          ? onRenderForIcon(isForActive)
          : <Icon
              type='octicon'
              name={(curVote ?? false) ? 'heart' : 'heart-outline'}
              size={size}
              color={isForActive ? Colors.heart : theme.colors.icon}
            />}
        <Text style={styles.contentTxtWrapper}>{`${curVotes ?? 'vote'}`}</Text>
      </BouncyButton>
      <Divider orientation='vertical' width={1} color={theme.colors.onSurfaceDisabled} />
      <BouncyButton
        style={styles.contentBtnWrapper}
        onPress={onAgainst}
      >
        {(onRenderAgainstIcon != null)
          ? onRenderAgainstIcon(isAgainstActive)
          : <Icon
              type='antdesign'
              name={isAgainstActive ? 'dislike1' : 'dislike2'}
              size={size}
              color={isAgainstActive ? Colors.som : theme.colors.icon}
            />}
      </BouncyButton>
    </View>
  )
}

export default VoteButton

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
