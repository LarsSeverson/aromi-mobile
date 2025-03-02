import { StyleSheet, View, type ViewStyle } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

export interface ProfileEmptyProps {
  headline: string
  body: string | undefined
  style?: ViewStyle | undefined
}

const ProfileEmpty = (props: ProfileEmptyProps) => {
  const { headline, body, style } = props

  return (
    <View style={StyleSheet.compose(styles.wrapper, style)}>
      <Text variant='titleSmall'>{headline}</Text>
      <Text variant='labelMedium' style={styles.bodyWrapper}>
        {body}
      </Text>
    </View>
  )
}

export default ProfileEmpty

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  bodyWrapper: {
    textAlign: 'center',
    opacity: 0.8
  }
})
