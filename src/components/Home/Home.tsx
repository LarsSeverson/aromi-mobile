import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { HomeBlock, HomeBlockTypes } from './HomeBlocks/HomeBlock'
import { Colors } from '@/src/constants/Colors'
import { gql, useQuery } from '@apollo/client'

const FRAGRANCES_QUERY = gql`
  query Fragrance($limit: Int) {
    fragrances(limit: $limit) {
      id
    }
  }
`

const Home: React.FC = () => {
  const suggestedData = useQuery(FRAGRANCES_QUERY, {
    variables: { limit: 6 }
  })

  const [refreshing, setRefreshing] = useState(false)

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
        <HomeBlock type={HomeBlockTypes.VerticalCards} title='suggested for you' data={suggestedData} onSeeAll={expandSuggestedForYou} />
        {
          suggestedData.loading || suggestedData.error
            ? null
            : <HomeBlock type={HomeBlockTypes.VerticalCards} title="see what's popular" data={suggestedData} onSeeAll={expandWhatsPopular} />
        }
        {/* <HomeBlock type={HomeBlockTypes.VerticalCards} title="see what's popular" data={suggestedData} onSeeAll={expandWhatsPopular} />
        <HomeBlock type={HomeBlockTypes.HorizontalCards} title='your likes' data={suggestedData} onSeeAll={expandYourLikes} />
        <HomeBlock type={HomeBlockTypes.HorizontalCards} title='recently viewed' data={suggestedData} onSeeAll={expandRecentlyViewed} numRows={2} />
        <HomeBlock type={HomeBlockTypes.HorizontalBars} title='continue your search' data={suggestedData} onSeeAll={expandRecentlyViewed} numRows={2} /> */}
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
