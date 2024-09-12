import { GestureResponderEvent, StyleSheet, View } from 'react-native'
import React from 'react'
import CategoryText from '../Misc/CategoryText'
import TextButton from '../Misc/TextButton'

interface HomeCategoryProps {
  children?: React.ReactNode
  onPress?: (event: GestureResponderEvent) => void | undefined
  expandable?: boolean
}

const HomeCategory: React.FC<HomeCategoryProps> = (props: HomeCategoryProps) => {
  const expandable = props.expandable !== undefined ? props.expandable : true

  return (
    <View style={styles.wrapper}>
      <CategoryText>{props.children}</CategoryText>
      {expandable && (
        <TextButton onPress={props.onPress} style={{ marginLeft: 'auto' }}>see all</TextButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default HomeCategory
