import { StyleSheet, Text, View, type ViewStyle } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
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

  const isForActive = curVote === true
  const isAgainstActive = curVote === false

  const curVotes = useMemo(() => {
    const getVoteValue = (vote: boolean | null) => vote === true ? 1 : vote === false ? -1 : 0

    return votes - getVoteValue(myVote) + getVoteValue(curVote)
  }, [votes, myVote, curVote])

  const onFor = useCallback(() => {
    const newVote = (curVote ?? false) ? null : true
    setCurVote(newVote)
    onVote?.(newVote)
  }, [curVote, onVote])

  const onAgainst = useCallback(() => {
    const newVote = curVote === false ? null : false
    setCurVote(newVote)
    onVote?.(newVote)
  }, [curVote, onVote])

  const renderForIcon = useMemo(() => {
    if (onRenderForIcon != null) {
      return onRenderForIcon(isForActive)
    }

    return (
      <Icon
        type='octicon'
        name={(curVote ?? false) ? 'heart-fill' : 'heart'}
        size={size}
        color={isForActive ? Colors.heart : theme.colors.icon}
      />
    )
  }, [onRenderForIcon, isForActive, curVote, size, theme.colors.icon])

  const renderAgainstIcon = useMemo(() => {
    if (onRenderAgainstIcon != null) {
      return onRenderAgainstIcon(isAgainstActive)
    }

    return (
      <Icon
        type='antdesign'
        name={isAgainstActive ? 'dislike1' : 'dislike2'}
        size={size}
        color={isAgainstActive ? Colors.som : theme.colors.icon}
      />
    )
  }, [onRenderAgainstIcon, isAgainstActive, size, theme.colors.icon])

  return (
    <View style={[
      styles.wrapper,
      {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.onSurfaceDisabled
      },
      style
    ]}
    >
      <BouncyButton
        style={styles.contentBtnWrapper}
        contentStyle={styles.contentWrapper}
        onPress={onFor}
      >
        {renderForIcon}
        <Text style={styles.contentTxtWrapper}>{`${curVotes ?? 'vote'}`}</Text>
      </BouncyButton>
      <Divider
        orientation='vertical'
        width={1}
        color={theme.colors.onSurfaceDisabled}
      />
      <BouncyButton
        style={styles.contentBtnWrapper}
        onPress={onAgainst}
      >
        {renderAgainstIcon}
      </BouncyButton>
    </View>
  )
}

export default React.memo(VoteButton)

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
