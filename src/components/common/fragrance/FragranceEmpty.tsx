import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'

export interface EmptyPropertyProps extends ViewProps {
  headline: string
  body?: string
  style?: ViewStyle
}

const FragranceEmpty = (props: EmptyPropertyProps) => {
  const { headline, body, style, ...rest } = props

  return (
    <View
      style={StyleSheet.compose(styles.wrapper, style)}
      {...rest}
    >
      <Text variant='titleSmall'>{headline}</Text>
      <Text
        variant='labelMedium'
        style={styles.bodyWrapper}
      >
        {body ?? 'Tried this fragrance? Help out the community by sharing your experience'}
      </Text>
    </View>
  )
}

export default FragranceEmpty

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
