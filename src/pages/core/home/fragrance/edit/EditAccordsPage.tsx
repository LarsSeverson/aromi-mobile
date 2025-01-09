import { StyleSheet, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFragranceAccords from '@/src/hooks/useFragranceAccords'
import AccordList from '@/src/components/fragrance/AccordList'
import { Text } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'
import ButtonText from '@/src/components/utils/ButtonText'
import { Colors } from '@/src/constants/Colors'
import SearchInput from '@/src/components/utils/SearchInput'
import BouncyButton from '@/src/components/utils/BouncyButton'

const EditAccordsPage = () => {
  const theme = useAppTheme()
  const router = useRouter()
  const fragranceId = Number(useLocalSearchParams().fragranceId)
  const [selectedCount, setSelectedCount] = useState(0)
  const selectedAccords = useRef(new Set<number>())
  const localSearchTerm = useRef('')
  const { accords, loading, error, noResults, hasMore, refresh, search, getMore } = useFragranceAccords(fragranceId, localSearchTerm.current)

  const searchAccords = useCallback(search, [search])

  const getMoreAccords = useCallback(() => !loading && hasMore && getMore(), [loading, hasMore, getMore])

  const processSearch = (newSearchTerm: string) => {
    localSearchTerm.current = newSearchTerm
    searchAccords(newSearchTerm)
  }

  const processSelected = (id: number | undefined) => {
    if (id === undefined) {
      return
    }

    if (selectedAccords.current.has(id)) {
      selectedAccords.current.delete(id)
    } else {
      selectedAccords.current.add(id)
    }

    setSelectedCount(selectedAccords.current.size)
  }

  if (!accords) {
    return null
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchInput onSearch={processSearch} />

      <AccordList
        accords={accords}
        gap={10}
        loading={loading}
        noResults={noResults}
        searchTerm={localSearchTerm.current}
        selectedAccordIds={selectedAccords.current}
        style={{ padding: 10 }}
        accordSelected={processSelected}
        getMoreAccords={getMoreAccords}
      />

      {selectedCount > 0 && (
        <View style={[styles.submitWrapper, { backgroundColor: theme.colors.background }]}>
          <ButtonText text={`Submit (${selectedCount})`} color={Colors.button} textColor={Colors.white} style={styles.submit} />
        </View>
      )}
    </View>
  )
}

export default EditAccordsPage

const styles = StyleSheet.create({
  submitWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
    marginTop: 'auto'
  },
  submit: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
})
