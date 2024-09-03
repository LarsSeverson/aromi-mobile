import { View, Text, GestureResponderEvent, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import HomeCategory from './HomeCategory'
import HomeFragranceCard from '../FragranceCards/HomeFragranceCard'
import AromiButton from '../StyledComponents/AromiButton'

interface HomeSectionProps {
  title: string
  data: any // TODO: Define the array
  onSeeAll: (event: GestureResponderEvent) => void | undefined
}

const HomeSection: React.FC<HomeSectionProps> = (props: HomeSectionProps) => {
  return (
    <View style={styles.wrapper}>
      <HomeCategory onPress={props.onSeeAll}>{props.title}</HomeCategory>
      <FlatList
        data={props.data.slice(0, 6)}
        renderItem={({ item }) => (<HomeFragranceCard />)}
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={styles.fragranceListWrapper}
        showsVerticalScrollIndicator={false}
      />
      <AromiButton onPress={props.onSeeAll}>see all</AromiButton>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    gap: 10
  },
  fragranceListWrapper: {
    gap: 10
  }
})

export default HomeSection
