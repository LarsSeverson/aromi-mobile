import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl, FlatList } from 'react-native'
import HomeFragranceCard from '../FragranceCards/HomeFragranceCard'

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

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={d}
        renderItem={({ item }) => (
          <HomeFragranceCard />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={styles.fragranceListWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  fragranceListWrapper: {
    gap: 10,
    padding: 10
  }
})

export default Home
