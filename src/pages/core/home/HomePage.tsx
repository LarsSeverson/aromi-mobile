import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import useSuggestedFragrances from '@/src/hooks/useSuggestedFragrances'
import AppError from '@/src/components/utils/AppError'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { HomeBlock, HomeBlockTypes } from '@/src/components/blocks/home-blocks/HomeBlock'
import { useRouter } from 'expo-router'

const HomePage = () => {
  const [refreshing, setRefreshing] = useState(false)
  const suggestFragrances = useSuggestedFragrances()
  const router = useRouter()

  const errors = [suggestFragrances.error].filter(Boolean)
  const refreshes = [suggestFragrances.refresh]

  const handleRefresh = async () => {
    setRefreshing(true)
    refreshes.forEach(refresh => refresh())
    setRefreshing(false)
  }

  const expandSuggestedForYou = () => {
    // TODO:
    console.log('suggested for you')
    router.navigate('/profile')
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

  if (errors.length > 0) {
    console.log(errors)

    return <AppError onRetry={handleRefresh} />
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={styles.homeContentWrapper}
      >
        <HomeBlock type={HomeBlockTypes.VerticalCards} title='suggested for you' data={suggestFragrances.data} onSeeAll={expandSuggestedForYou} />
      </ScrollView>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10
  },
  homeContentWrapper: {
    gap: 20
  }
})
