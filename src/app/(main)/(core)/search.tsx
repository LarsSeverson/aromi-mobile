import React from 'react'
import Search from '@/src/components/search/Search'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Search />
    </SafeAreaView>
  )
}

export default SearchPage
