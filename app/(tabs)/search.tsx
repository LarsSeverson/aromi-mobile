import React from 'react'
import Search from '@/components/Search/Search'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchPage: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Search />
    </SafeAreaView>
  )
}

export default SearchPage
