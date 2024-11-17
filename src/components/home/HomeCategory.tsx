import { GestureResponderEvent, StyleSheet, View } from 'react-native'
import React from 'react'
import CategoryText from '../utils/CategoryText'
import TextButton from '../utils/TextButton'

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
        <TextButton onPress={props.onPress} text='see all' wrapperStyle={{ marginLeft: 'auto' }} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default HomeCategory