import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'

import HomeSection from './HomeSection'
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
    // Fetch new data
    setRefreshing(false)
  }

  const expandSuggestedForYou = () => {
    console.log('suggested for you')
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        <HomeSection title='suggested for you' data={d} onSeeAll={expandSuggestedForYou} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white
  }
})

export default Home
