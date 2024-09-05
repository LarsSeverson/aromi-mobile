import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'

import { HomeBlock, HomeBlockTypes } from './HomeBlocks/HomeBlock'
import { Colors } from '@/constants/Colors'

const d = [
  { w: 'w' },
  { w: 'w' },
  { w: 'w' },
  { w: 'w' },
  { w: 'w' },
  { w: 'w' },
  { w: 'w' },
  { w: 'w' },
  { w: 'w' },
  { w: 'w' }
]

const Home: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [fragranceData, setFragranceData] = useState(d)

  const handleRefresh = async () => {
    setRefreshing(true)
    // TODO:
    // Fetch new data
    setRefreshing(false)
  }

  const expandSuggestedForYou = () => {
    // TODO:
    console.log('suggested for you')
  }

  const expandWhatsPopular = () => {
    console.log('what popular')
  }

  const expandYourLikes = () => {
    // TODO:
    console.log('your likes')
  }

  const expandRecentlyViewed = () => {
    // TODO:
    console.log('recently viewed')
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.homeContentWrapper}
      >
        <HomeBlock type={HomeBlockTypes.VerticalCards} title='suggested for you' data={d} onSeeAll={expandSuggestedForYou} />
        <HomeBlock type={HomeBlockTypes.VerticalCards} title="see what's popular" data={d} onSeeAll={expandWhatsPopular} />
        <HomeBlock type={HomeBlockTypes.HorizontalCards} title='your likes' data={d} onSeeAll={expandYourLikes} />
        <HomeBlock type={HomeBlockTypes.HorizontalCards} title='recently viewed' data={d} onSeeAll={expandRecentlyViewed} numRows={2} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white
  },
  homeContentWrapper: {
    gap: 20
  }
})

export default Home
