import { NativeSyntheticEvent, StyleSheet, TextLayoutEventData, View } from 'react-native'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import TextButton from './TextButton'
import { useAppTheme } from '../../constants/Themes'
import { Colors } from '../../constants/Colors'

export interface ExpandableParagraphProps {
  text: string
  numLines: number
  disabled?: boolean | undefined
}

const ExpandableParagraph = (props: ExpandableParagraphProps) => {
  const theme = useAppTheme()
  const { text, numLines, disabled = false } = props
  const [expanded, setExpanded] = useState(false)
  const [truncated, setTruncated] = useState(false)

  const handleTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (!expanded) {
      setTruncated(e.nativeEvent.lines.length >= numLines)
    }
  }

  const onRenderText = () => {
    return (
      <Text>... <Text style={{ color: Colors.button }}>see more</Text></Text>
    )
  }

  return (
    <View style={styles.wrapper}>
      <Text
        style={styles.text}
        numberOfLines={!expanded ? numLines : undefined}
        ellipsizeMode='tail'
        onTextLayout={handleTextLayout}
      >{text}
      </Text>
      {!expanded && truncated && !disabled &&
        <TextButton
          text='awd'
          wrapperStyle={[styles.seeMoreWrapper, { backgroundColor: theme.colors.background }]}
          onPress={() => setExpanded(true)}
          onRenderText={onRenderText}
        />}
    </View>
  )
}

export default ExpandableParagraph

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative'
  },
  text: {
    //
  },
  seeMoreWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 5,
    zIndex: 2
  }
})
