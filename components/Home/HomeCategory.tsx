import { GestureResponderEvent, StyleSheet, View } from 'react-native'
import React from 'react'
import CategoryText from '../StyledComponents/CategoryText'
import TextButton from '../StyledComponents/TextButton'

interface HomeCategoryProps {
  children?: React.ReactNode
  onPress?: (event: GestureResponderEvent) => void | undefined
}

const HomeCategory: React.FC<HomeCategoryProps> = ({ children, onPress }: HomeCategoryProps) => {
  return (
    <View style={styles.wrapper}>
      <CategoryText>{children}</CategoryText>
      <TextButton onPress={onPress} style={{ marginLeft: 'auto' }}>see all</TextButton>
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
