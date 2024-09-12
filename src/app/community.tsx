import Community from '@/src/components/Community/Community'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchPage: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Community />
    </SafeAreaView>
  )
}

export default SearchPage